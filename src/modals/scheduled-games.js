import mongoose from 'mongoose';

const ScheduledGamesSchema = new mongoose.Schema(
  {
    opponent: {
      type: String,
    },
    location: {
      type: String,
    },
    locationAddress: {
      type: String,
    },
    time: {
      type: String,
    },
    date: {
      type: String,
    },
    type: {
      type: String,
    },
    timeZoneName: {
      type: String,
    },
    timeZoneOffset: {
      type: Number,
    },
    status: {
      type: Boolean,
    },
    teamId: {
      type: String,
    },
    usersNotAttending:{
      type: Array,
    }
  },
  {
    timestamps: true,
  }
);

const ScheduledGames = mongoose.model('ScheduledGames', ScheduledGamesSchema);
export default ScheduledGames;
