import { sendPushNotification } from '../firebase/index.js';
import AnnouncementSchema from '../joi-schemas/announcement.js';
import Announcement from '../modals/announcement.js';
import Notification from '../modals/notifications.js';
import { updateUserLastActivity } from "./user-controller.js";

const AnnouncementController = {
  createAnnouncement: async function (req, res) {
    const reqUser = req.user;
    updateUserLastActivity(reqUser._id);
    sendPushNotification(
      'A new Announcement has been posted',
      reqUser.teamId.toString()
    );
    try {
      const announcement = req.body;
      
      const validatedAnnouncement = await AnnouncementSchema.validateAsync({
        ...announcement,
        teamId: reqUser.teamId.toString(),
      });
      await Notification.create({
        teamId: reqUser.teamId.toString(),
        message: `A new Announcement has been posted`,
      });
      const createdAnnouncement = await Announcement.create(
        validatedAnnouncement
      );
      res.json({
        message: 'Announcement created successfully',
        announcement: createdAnnouncement,
        success: true,
      });
    } catch (error) {
      res.json({
        message: 'Announcement creation failed',
        error: error.message,
        success: false,
      });
    }
  },
  getAnnouncements: async function (req, res) {
    const reqUser = req.user;
    try {
      const announcements = await Announcement.find({
        teamId: reqUser.teamId.toString(),
      });
      updateUserLastActivity(reqUser._id);

      res.json({
        message: 'Announcements retrieved successfully',
        announcements,
        success: true,
      });
    } catch (error) {
      res.json({
        message: 'Announcements retrieval failed',
        error: error.message,
        success: false,
      });
    }
  },
  editAnnouncement: async function (req, res) {
    try {
      const reqUser = req.user;
      const announcement = req.body;
      updateUserLastActivity(reqUser._id);

      const validatedAnnouncement = await AnnouncementSchema.validateAsync({
        title: announcement.title,
        description: announcement.description,
        teamId: reqUser.teamId.toString(),
      });
      const updatedAnnouncement = await Announcement.findByIdAndUpdate(
        announcement._id,
        validatedAnnouncement,
        { new: true }
      );
      await Notification.create({
        teamId: reqUser.teamId.toString(),
        message: `A Announcement has been updated`,
      });
      sendPushNotification(
        `A Announcement has been updated`,
        reqUser.teamId.toString()
      );
      res.json({
        message: 'Announcement updated successfully',
        announcement: updatedAnnouncement,
        success: true,
      });
    } catch (error) {
      res.json({
        message: 'Announcement update failed',
        error: error.message,
        success: false,
      });
    }
  },
  deleteAnnouncement: async function (req, res) {
    try {
      const announcement = req.body;
      const deletedAnnouncement = await Announcement.findByIdAndDelete(
        announcement._id.toString()
      );

      res.json({
        message: 'Announcement deleted successfully',
        announcement: deletedAnnouncement,
        success: true,
      });
    } catch (error) {
      res.json({
        message: 'Announcement deletion failed',
        error: error.message,
        success: false,
      });
    }
  },
  getNotifications: async function (req, res) {
    try {
      const reqUser = req.user;
      const notifications = await Notification.find({
        teamId: reqUser.teamId.toString(),
      });
      updateUserLastActivity(reqUser._id);
      res.json({
        message: 'Notifications retrieved successfully',
        notifications,
        success: true,
      });
    } catch (error) {
      res.json({
        message: 'Notifications retrieval failed',
        error: error.message,
        success: false,
      });
    }
  },
};

export default AnnouncementController;
