import mongoose from 'mongoose';

import { default as bcrypt } from 'bcryptjs';

const AnnouncementSchema = new mongoose.Schema(
  {
   
    title: {
      type: String,
    },
    description: {
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

const Announcement = mongoose.model('Announcement', AnnouncementSchema);
export default Announcement;
