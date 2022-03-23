import AnnouncementSchema from '../joi-schemas/announcement.js';
import Announcement from '../modals/announcement.js';

const AnnouncementController = {
  createAnnouncement: async function (req, res) {
    try {
      const announcement = req.body;
      const reqUser = req.user;
      const validatedAnnouncement = await AnnouncementSchema.validateAsync({
        ...announcement,
        teamId: reqUser.teamId,
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
    try {
      const reqUser = req.user;
      const announcements = await Announcement.find({
        teamId: reqUser.teamId,
      });
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
      const validatedAnnouncement = await AnnouncementSchema.validateAsync({
        title: announcement.title,
        description: announcement.description,
        teamId: reqUser.teamId,
      });
      const updatedAnnouncement = await Announcement.findByIdAndUpdate(
        announcement._id,
        validatedAnnouncement,
        { new: true }
      );
      console.log('updatedAnnouncement', updatedAnnouncement)
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
        announcement._id
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
  }
  
};

export default AnnouncementController;
