import Team from '../modals/team.js';
import User from '../modals/user.js';

const teamController = {
  register: function (req, res) {},

  getTeam: async function (req, res) {
    const reqUser = req.user;
    const users = await User.where({ teamId: reqUser.teamId });
    res.json({
      message: 'Team found',
      users: users,
      success: true,
    });
  },
  getTeamInfo: async function (req, res) {
    const reqUser = req.user;
    const team = await Team.findById(reqUser.teamId.toString());
    res.json({
      message: 'Team found',
      team: team,
      success: true,
    });
  },
};

export default teamController;
