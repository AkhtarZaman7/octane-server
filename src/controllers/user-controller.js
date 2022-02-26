import { generateAccessToken } from '../authorization/index.js';
import TeamSchema from '../joi-schemas/team.js';
import UserSchema, { loginSchema } from '../joi-schemas/user.js';

import Team from '../modals/team.js';
import User from '../modals/user.js';
import sendMail from '../utils/mailer/index.js';

const userController = {
  login: async function (req, res) {
    try {
      await loginSchema.validateAsync(req.body);
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        throw new Error('User not found');
      }
      const isMatch = await user.matchesPassword(req.body.password);
      if (!isMatch) {
        throw new Error('Incorrect password');
      }
      const accessTokenData = {
        userId: user._id,
        email: user.email,
        username: user.username,
        teamId: user.teamId,
      };

      const accessToken = generateAccessToken(accessTokenData);
      res.json({ user: user, accessToken });
    } catch (error) {
      res.json({
        message: 'Login failed',
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
        });
        res.json({
          message: 'User registered successfully',
          user: registeredUser,
          team: registeredTeam,
          success: true,
        });
      } else {
        if (!user.teamId.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error('Team not found');
        }
        const registeredUser = await User.create({
          ...userValues,
        });
        const team = await Team.findById(user.teamId);
        if (team) {
          res.json({
            message: 'User registered successfully',
            user: registeredUser,
            team: team,
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
    const user = await User.findById(reqUser.userId);
    const team = await Team.findById(user.teamId);

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
};

export default userController;
