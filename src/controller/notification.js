import {
  getNotificationsService,
  readNotificationService,
} from "../service/notification.js";

class NotificationController {
  async getNotifications(req, res) {
    const { _id } = req.user;
    try {
      const result = await getNotificationsService(_id);
      return result.EC === 0
        ? res.success(result.result, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError();
    }
  }

  async readNotification(req, res) {
    const { _id } = req.user;
    const { id } = req.params;
    try {
      const result = await readNotificationService(_id, id);
      return result.EC === 0
        ? res.success(result.result, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      console.log(error);
      return res.InternalError();
    }
  }
}

export default new NotificationController();
