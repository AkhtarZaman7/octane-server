import { generateAccessToken } from '../authorization/index.js';
import TeamSchema from '../joi-schemas/team.js';
import UserSchema, {
  loginSchema,
  passwordSchema,
  updateUserSchema,
} from '../joi-schemas/user.js';
import { default as bcrypt } from 'bcryptjs';

import Team from '../modals/team.js';
import User from '../modals/user.js';
import sendMail, { sendInvitation } from '../utils/mailer/index.js';
import { v4 as uuid } from 'uuid';
import InviteUserSchema from '../joi-schemas/invite-users.js';
import InviteUsers from '../modals/user-invitation.js';
import Notification from "../modals/notifications.js";

const userController = {
  login: async function (req, res) {
    try {
      // await loginSchema.validateAsync(req.body);
      let user = await User.findOne({ email: req.body.email });
      if(!user) {
        user = await User.findOne({ username: req.body.email });
      }
      if (!user) {
        throw new Error('email or username is invalid');
      }
      const team = await Team.findOne({ _id: user.teamId.toString() });
      const isMatch = await user.matchesPassword(req.body.password);
      if (!isMatch) {
        throw new Error('Incorrect password');
      }
      const accessTokenData = {
        userId: user._id,
        email: user.email,
        username: user.username,
        teamId: user.teamId,
        team: team,
      };

      const accessToken = generateAccessToken(accessTokenData);
      res.json({ user: user, accessToken, success: true ,team});
    } catch (error) {
      res.json({
        message: 'Login failed',
        error: error.message,
        success: false,
      });
    }
  },
  updateUser: async function (req, res) {
    try {
      const reqUser = req.user;
      const user = req.body;
      const validatedUser = await updateUserSchema.validateAsync({
        ...user,
        teamId: reqUser.teamId.toString(),
      });
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        validatedUser,
        { new: true }
      );
      res.json({
        message: 'User updated successfully',
        user: updatedUser,
        success: true,
      });
    } catch (error) {
      res.json({
        message: 'User update failed',
        error: error.message,
        success: false,
      });
    }
  },
  register: async function (req, res) {
    try {
      const user = req.body.user;
      let team = req.body.team;
      const userValues = await UserSchema.validateAsync(user);

      if (user.role === 'coach') {
        const teamValues = await TeamSchema.validateAsync(team);
        const registeredTeam = await Team.create(teamValues);
        const teamId = registeredTeam._id;
        const registeredUser = await User.create({
          ...userValues,
          teamId: teamId,
          role: 'coach',
          position: 'forward',
        });
        const accessTokenData = {
          userId: registeredUser._id,
          email: registeredUser.email,
          username: registeredUser.username,
          teamId: registeredUser.teamId,
        };

        const accessToken = generateAccessToken(accessTokenData);
        res.json({
          message: 'User registered successfully',
          user: registeredUser,
          team: registeredTeam,
          accessToken,
          success: true,
        });
      } else {
        if (!user.teamId.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error('Team not found');
        }
        const registeredUser = await User.create({
          ...userValues,
          teamId: user.teamId,
          role: 'player',
          position: 'forward',
        });
        await Notification.create({
          teamId: user.teamId.toString(),
          message: `A new player has joined your team - head over to the team chat to welcome them!`,
        })

        const team = await Team.findById(user.teamId);
        if (team) {
          const accessTokenData = {
            userId: registeredUser._id,
            email: registeredUser.email,
            username: registeredUser.username,
            teamId: registeredUser.teamId,
          };

          const accessToken = generateAccessToken(accessTokenData);
          res.json({
            message: 'User registered successfully',
            user: registeredUser,
            team: team,
            accessToken,
            success: true,
          });
        } else {
          throw new Error('Team not found');
        }
      }
    } catch (error) {
      res.json({
        message: 'registration failed',
        error: error.message,
        success: false,
      });
    }
  },
  invite: async function (req, res) {
    const reqUser = req.user;
    const user = await User.findById(reqUser.userId.toString());
    const team = await Team.findById(user.teamId.toString());
    const response = sendMail(
      'azcodes12@gmail.com',
      ` ${user.username} has invited you to join their team ${team.teamName}`
    );
    if (response) {
      res.json({
        message: 'Invitation sent successfully',
      });
    } else {
      res.json({
        message: 'Invitation failed',
      });
    }
  },
  requestResetPassword: async function (req, res) {
    const email = req.body.email;
    const user = await User.find({ email: email });
    if (user.length === 0) {
      res.json({
        message: 'User not found',
        success: false,
      });
    }
    const code = uuid().slice(0, 6).toLocaleUpperCase();
    const response = sendMail(email, ` Password Reset Code : ${code}`);
    if (response) {
      res.json({
        message: 'Check your email',
        code: code,
        success: true,
      });
    } else {
      res.json({
        message: 'Password Reset Failed failed',
        success: false,
      });
    }
  },
  resetPassword: async function (req, res) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const userValues = await passwordSchema.validateAsync({ password });
      const encPassword = await bcrypt.hash(userValues.password, 10);
      const response = await User.findOneAndUpdate(
        { email: email },
        { password: encPassword }
      );
      if (response) {
        res.json({
          message: 'Password reset successfully',
          success: true,
        });
      } else {
        res.json({
          message: 'Password reset failed',
          success: false,
        });
      }
    } catch (error) {
      res.json({
        message: error.message,
        error: error.message,
        success: false,
      });
    }
  },
  inviteUsers: async function (req, res) {
    try {
      const reqUser = req.user;
      const user = await User.findById(reqUser._id);
      const team = await Team.findById(user.teamId.toString());

      const users = req.body.users;
      const validatedUsers = await users.map(async (item) => {
        const token = uuid().slice(0, 6).toLocaleUpperCase();
        return await InviteUserSchema.validateAsync({
          ...item,
          teamId: user.teamId.toString(),
          token,
        });
      });
      const registeredUsers = await Promise.all(validatedUsers);
      const responses = await registeredUsers.map(async (validatedUser) => {
        const existingUser = await User.findOne({ email: validatedUser.email });
        if (existingUser) {
          throw new Error(
            `User with email ${validatedUser.email} already exists`
          );
        }
        const response = await sendInvitation(
          validatedUser.email,
          team.teamName,
          validatedUser.token
        );
        if (response) {
          await InviteUsers.create(validatedUser);
        }
        return response;
      });
      const successResponses = await Promise.all(responses);
      res.json({
        message: 'Invitation sent successfully',
        success: true,
      });
    } catch (error) {
      res.json({
        error: 'Invitation failed',
        message: error.message,
        success: false,
      });
    }
  },
  userInvitation: async function (req, res) {
    try {
      const response = await InviteUsers.findOne({ token: req.body.code });
      if (response) {
        res.json({
          message: 'Invitation sent successfully',
          users: response,
          success: true,
        });
      } else {
        res.json({
          message: 'Invitation does not exist',
          success: false,
        });
      }
    } catch (error) {
      res.json({
        message: 'Invitation failed',
        error: error.message,
        success: false,
      });
    }
  },
  deleteUser: async function (req, res) {
    try {
      const response = await User.findOneAndDelete({
        _id: req.body.id.toString(),
      });
      if (response) {
        res.json({
          message: 'User deleted successfully',
          success: true,
        });
      } else {
        res.json({
          message: 'User not found',
          success: false,
        });
      }
    } catch (error) {
      res.json({
        message: 'User deletion failed',
        error: error.message,
        success: false,
      });
    }
  },
};

export default userController;
