import ScheduledGamesSchema from '../joi-schemas/scheduled-games.js';
import ScheduledGames from '../modals/scheduled-games.js';

const ScheduleGamesController = {
  scheduleGame: async function (req, res) {
    try {
      const reqUser = req.user;
      const game = req.body;
      const gameValues = {
        ...game,
        teamId: reqUser.teamId.toString(),
      };
      const validatedGame = await ScheduledGamesSchema.validateAsync(
        gameValues
      );
      const registeredGame = await ScheduledGames.create({
        ...validatedGame,
        status: 'valid',
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
  getGames: async function (req, res) {
    try {
      const reqUser = req.user;
      const games = await ScheduledGames.find({ team: reqUser.teamId });
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
};

export default ScheduleGamesController;
