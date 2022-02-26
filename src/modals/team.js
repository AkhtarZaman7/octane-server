import mongoose from 'mongoose';

import { default as bcrypt } from 'bcryptjs';

const TeamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      validate: {
        validator: async (teamName) => {
          return (await Team.where({ teamName }).countDocuments()) === 0;
        },
        message: ({ value }) => `Team name ${value} has already been taken`,
      },
    },
    leagueName: {
      type: String,
    },
    teamLogo: {
      type: String,
    },
    attributes: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);



const Team = mongoose.model('Team', TeamSchema);
export default Team;
