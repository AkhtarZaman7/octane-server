import Notification from "../modals/notifications.js";

const notificationController = {
    deleteNotification:async (req, res) => {
        console.log('req.body', req.body)
        try {
            const response =await  Notification.findOneAndDelete({
                _id: req.body.id.toString(),
            });
            if (response) {
                res.json({
                    message: 'Notification deleted successfully',
                    success: true,
                });
            } else {
                res.json({
                    message: 'Notification not found',
                    success: false,
                });
            }
        } catch (error) {
            res.json({
                message: 'Notification deletion failed',
                error: error.message,
                success: false,
            });
        }
    }
};

export default notificationController;