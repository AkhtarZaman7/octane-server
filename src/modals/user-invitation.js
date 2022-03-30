import mongoose from 'mongoose';

const userInvitationSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    token: {
      type: String,
    },
    teamId: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

const InviteUsers = mongoose.model('InviteUsers', userInvitationSchema);
export default InviteUsers;
