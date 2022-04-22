import Announcement from '../modals/announcement.js';
import ScheduledGames from '../modals/scheduled-games.js';
import Team from '../modals/team.js';
import User from '../modals/user.js';

const adminController = {
  summary: async (req, res) => {
    try {
      const teams = await Team.find();
      const summary = teams.map(async (team) => {
        const coach = await User.findOne({
          teamId: team._id.toString(),
          role: 'coach',
        });
        const players = await User.find({ teamId: team._id.toString() });
        return {
          team: team.teamName,
          coach: coach?.firstName + ' ' + coach?.lastName,
          players: players.length,
        };
      });
      res.json({
        message: 'Summary retrieved successfully',
        success: true,
        summary: await Promise.all(summary),
      });
    } catch (error) {
      res.json({
        error: 'Failed to fetch summary',
        message: error.message,
        success: false,
      });
    }
  },
  teamLevelSummary: async (req, res) => {
    try {
      const teams = await Team.find();
      const summary = teams.map(async (team) => {
        const games = await ScheduledGames.find({
          team: team._id.toString(),
        });
        const announcements = await Announcement.find({
          teamId: team._id.toString(),
        });
        return {
          team: team.teamName,
          image: team.image,
          scheduledGames: games.length,
          announcements: announcements.length,
        };
      });
      res.json({
        message: 'Summary retrieved successfully',
        success: true,
        summary: await Promise.all(summary),
      });
    } catch (error) {
      res.json({
        error: 'Failed to fetch summary',
        message: error.message,
        success: false,
      });
    }
  },
  systemLevelSummary: async (req, res) => {
    try {
      const teams = await Team.find();
      const players = await User.find();
      const scheduledGames = await ScheduledGames.find();
      const announcements = await Announcement.find();

      res.json({
        message: 'Summary retrieved successfully',
        success: true,
        summary: {
          teams: teams.length,
          players: players.length,
          scheduledGames: scheduledGames.length,
          announcements: announcements.length,
        },
      });
    } catch (error) {
      res.json({
        error: 'Failed to fetch summary',
        message: error.message,
        success: false,
      });
    }
  },
};

export default adminController;
