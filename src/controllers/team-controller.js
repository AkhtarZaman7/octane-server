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

  updateTeamInfo: async function (req, res) {
    const reqUser = req.user;
    const team = await Team.findByIdAndUpdate(
      { _id: reqUser.teamId.toString() },
      req.body
    );
    res.json({ message: 'Team updated successfully', success: true, team });
  },
  teamExists: async (req, res) => {
    const {name} = req.body;
    const team = await Team.find({ teamName:name });
    if (team.length>0) {
      res.json({
        team,
        success: true,
      });
    } else {
      res.json({
        success: false,
      });
    }
  },
};

export default teamController;
