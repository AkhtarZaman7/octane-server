import { sendPushNotification } from "../firebase/index.js";
import ScheduledGamesSchema from '../joi-schemas/scheduled-games.js';
import Notification from '../modals/notifications.js';
import ScheduledGames from '../modals/scheduled-games.js';
import { updateUserLastActivity } from "./user-controller.js";

const ScheduleGamesController = {
  scheduleGame: async function (req, res) {
    try {
      const reqUser = req.user;
      sendPushNotification(
        'A new event has been scheduled',
        reqUser.teamId.toString()
      );
      updateUserLastActivity(reqUser._id);

      const game = req.body;
      const gameValues = {
        ...game,
        teamId: reqUser.teamId.toString(),
      };
      const validatedGame = await ScheduledGamesSchema.validateAsync(
        gameValues
      );
      await Notification.create({
        message: `A new ${
          game.type === 'Game' ? 'Game' : 'Practice'
        } has been scheduled`,
      });
      const registeredGame = await ScheduledGames.create({
        ...validatedGame,
        status: false,
        usersNotAttending: [],
      });

      res.json({
        message: 'Game scheduled successfully',
        game: registeredGame,
        success: true,
      });
    } catch (error) {
      res.json({
        error: 'Game scheduling failed',
        message: error.message,
        success: false,
      });
    }
  },
  editGame: async function (req, res) {
    try {
      const reqUser = req.user;
      updateUserLastActivity(reqUser._id);

      const game = req.body;
      const {  location,
        locationAddress,
        opponent,
        time,
        date,
        timeZoneName,
        timeZoneOffset,
        type} = game;
      const gameValues = {
        location,
        locationAddress,
        opponent,
        time,
        date,
        timeZoneName,
        timeZoneOffset,
        type,
        teamId: reqUser.teamId.toString(),
      };
      const validatedGame = await ScheduledGamesSchema.validateAsync(
        gameValues
      );
      const updatedGame = await ScheduledGames.findByIdAndUpdate(
        game.id,
        validatedGame,
        { new: true }
      );
      res.json({
        message: 'Game updated successfully',
        game: updatedGame,
        success: true,
      });
    } catch (error) {
      res.json({
        error: 'Game update failed',
        message: error.message,
        success: false,
      });
    }
  },
  getGames: async function (req, res) {
    try {
      const reqUser = req.user;
      updateUserLastActivity(reqUser._id);

      const games = await ScheduledGames.find({ teamId: reqUser.teamId });
      const sortedGames = games.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      res.json({
        message: 'Games retrieved successfully',
        games: sortedGames,
        success: true,
      });
    } catch (error) {
      res.json({
        error: 'Failed to fetch game',
        message: error.message,
        success: false,
      });
    }
  },
  UpdateGameStatus: async function (req, res) {
    try {
      const reqUser = req.user;
      updateUserLastActivity(reqUser._id);

      const gameId = req.body.gameId.toString();
      const gameStatus = req.body.gameStatus;
      const game = await ScheduledGames.findOne({
        _id: gameId,
        team: reqUser.teamId,
      });
      if (gameStatus) {
        await Notification.create({
          teamId: reqUser.teamId.toString(),
          message: `A ${
            game.type === 'Game' ? 'Game' : 'Practice'
          } has been cancelled`,
        });
        sendPushNotification(
          `A ${
            game.type === 'Game' ? 'Game' : 'Practice'
          } has been cancelled`,
          reqUser.teamId.toString()
        );
      }
      if (game) {
        game.status = gameStatus;
        await game.save();
        res.json({
          message: 'Game status updated successfully',
          success: true,
          status: gameStatus,
        });
      } else {
        res.json({
          error: 'Game not found',
          message: 'Game not found',
          success: false,
        });
      }
    } catch (error) {
      res.json({
        error: 'Failed to update game status',
        message: error.message,
        success: false,
      });
    }
  },
  updateGameUsers: async function (req, res) {
    try {
      const reqUser = req.user;
      updateUserLastActivity(reqUser._id);

      const gameId = req.body.gameId.toString();
      const gameUsers = req.body.gameUsers;
      const game = await ScheduledGames.findOne({
        _id: gameId,
      });
      if (game) {
        await Notification.create({
          teamId: reqUser.teamId.toString(),
          message: `A Player has marked himself ${
            game.usersNotAttending.length < gameUsers.length
              ? 'Available'
              : 'Un available'
          } for a game`,
        });

        sendPushNotification(
          `A Player has marked himself ${
            game.usersNotAttending.length < gameUsers.length
              ? 'Available'
              : 'Un available'
          } for a game`,
          reqUser.teamId.toString()
        );

        game.usersNotAttending = gameUsers;
        await game.save();

        res.json({
          message: 'Game users updated successfully',
          success: true,
          usersNotAttending: gameUsers,
        });
      } else {
        res.json({
          error: 'Game not found',
          message: 'Game not found',
          success: false,
        });
      }
    } catch (error) {
      res.json({
        error: 'Failed to update game users',
        message: error.message,
        success: false,
      });
    }
  },
};

export default ScheduleGamesController;
