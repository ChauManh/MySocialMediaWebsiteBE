import {
  getUserService,
  updateUserService,
  getOwnerUserService,
  sendFriendRequestService,
  backSentRequestService,
  acceptFriendRequestService,
  denyFriendRequestService,
  cancelFriendService,
  getFriendListService,
} from "../service/user.js";

class UserController {
  async getOwnerUser(req, res) {
    const { userId } = req.user;
    try {
      const result = await getOwnerUserService(userId);
      return result.EC === 0
        ? res.success(result.result, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError(error.message);
    }
  }

  async getUser(req, res) {
    const { userId } = req.user;
    const userIdResponse = req.params.userId;
    try {
      const result = await getUserService(userId, userIdResponse);
      return result.EC === 0
        ? res.success(result.result, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError(error.message);
    }
  }

  async updateUser(req, res) {
    const { userId } = req.user;
    const { dataUpdate } = req.body;
    try {
      const result = await updateUserService(userId, dataUpdate);
      return result.EC === 0
        ? res.success(result.result, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError(error.message);
    }
  }

  async sendFriendRequest(req, res) {
    const { userId } = req.user;
    const userIdTarget = req.params.userId;
    try {
      const result = await sendFriendRequestService(userId, userIdTarget);
      return result.EC === 0
        ? res.success(null, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError(error.message);
    }
  }

  async backSentRequest(req, res) {
    const { userId } = req.user;
    const userIdTarget = req.params.userId;
    try {
      const result = await backSentRequestService(userId, userIdTarget);
      return result.EC === 0
        ? res.success(null, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError(error.message);
    }
  }

  async acceptFriendRequest(req, res) {
    const { userId } = req.user;
    const userIdTarget = req.params.userId;
    try {
      const result = await acceptFriendRequestService(userId, userIdTarget);
      return result.EC === 0
        ? res.success(null, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError(error.message);
    }
  }

  async denyFriendRequest(req, res) {
    const { userId } = req.user;
    const userIdTarget = req.params.userId;
    try {
      const result = await denyFriendRequestService(userId, userIdTarget);
      return result.EC === 0
        ? res.success(null, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError(error.message);
    }
  }

  async cancelFriend(req, res) {
    const { userId } = req.user;
    const userIdTarget = req.params.userId;
    try {
      const result = await cancelFriendService(userId, userIdTarget);
      return result.EC === 0
        ? res.success(null, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError(error.message);
    }
  }

  async getFriendList(req, res) {
    const userId = req.params.userId;
    try {
      const result = await getFriendListService(userId);
      return result.EC === 0
        ? res.success(result.result, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError(error.message);
    }
  }
}

export default new UserController();
