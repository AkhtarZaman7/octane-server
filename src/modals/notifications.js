import mongoose from 'mongoose';

import { default as bcrypt } from 'bcryptjs';

const NotificationSchema = new mongoose.Schema(
  {
    userId:{
        type: String,
    },
    username:{
        type: String,
    },
    message:{
        type: String,
    },
    teamId:{
        type: String,
    },
  },
  {
    timestamps: true,
  }
);



const Notification = mongoose.model('Notification', NotificationSchema);
export default Notification;
