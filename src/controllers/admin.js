import Announcement from '../modals/announcement.js';
import ScheduledGames from '../modals/scheduled-games.js';
import Team from '../modals/team.js';
import User from '../modals/user.js';
import moment from 'moment';

const adminController = {
  summary: async (req, res) => {
    const days = req.body.days;
    try {
      const days = req.body.days;
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
          players: players.filter(
            (player) =>
              moment().subtract(days, 'days') < moment(player.createdAt)
          ).length,
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
      const days = req.body.days;
      const teams = await Team.find();
      const summary = teams.map(async (team) => {
        const games = await ScheduledGames.find({
          teamId: team._id.toString(),
        });
        const announcements = await Announcement.find({
          teamId: team._id.toString(),
        });
        return {
          team: team.teamName,
          image: team.image,
          scheduledGames: games.filter(
            (game) => moment().subtract(days, 'days') < moment(game.createdAt)
          ).length, //,games.length,
          announcements: announcements.filter(
            (announcement) =>
              moment().subtract(days, 'days') < moment(announcement.createdAt)
          ).length, //announcements.length,
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
      const days = req.body.days;
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
          scheduledGames: scheduledGames.filter(
            (game) => moment().subtract(days, 'days') < moment(game.createdAt)
          ).length, //,scheduledGames.length,
          announcements: announcements.filter(
            (announcement) =>
              moment().subtract(days, 'days') < moment(announcement.createdAt)
          ).length, //announcements.length,
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
