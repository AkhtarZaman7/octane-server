import User from '../modals/user.js';

const teamController = {
  register: function (req, res) {},

  getTeam: async function (req, res) {
    const reqUser = req.user;
    const users = await User.where({ teamId: reqUser.teamId });
    console.log('users', users);
    res.json({
      message: 'Team found',
      users: users,
      success: true
    })
  },
};

export default teamController;
