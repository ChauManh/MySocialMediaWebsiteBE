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
    const { _id } = req.user;
    try {
      const result = await getOwnerUserService(_id);
      return result.EC === 0
        ? res.success(result.result, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError();
    }
  }

  async getUser(req, res) {
    const { _id } = req.user;
    const userIdResponse = req.params.userId;
    try {
      const result = await getUserService(_id, userIdResponse);
      return result.EC === 0
        ? res.success(result.result, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError();
    }
  }

  async updateUser(req, res) {
    const { _id } = req.user;
    const { dataUpdate } = req.body;
    try {
      const result = await updateUserService(_id, dataUpdate);
      return result.EC === 0
        ? res.success(result.result, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError();
    }
  }

  async sendFriendRequest(req, res) {
    const { _id } = req.user;
    const userIdTarget = req.params.userId;
    try {
      const result = await sendFriendRequestService(_id, userIdTarget);
      return result.EC === 0
        ? res.success(null, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError();
    }
  }

  async backSentRequest(req, res) {
    const { _id } = req.user;
    const userIdTarget = req.params.userId;
    try {
      const result = await backSentRequestService(_id, userIdTarget);
      return result.EC === 0
        ? res.success(null, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError();
    }
  }

  async acceptFriendRequest(req, res) {
    const { _id } = req.user;
    const userIdTarget = req.params.userId;
    try {
      const result = await acceptFriendRequestService(_id, userIdTarget);
      return result.EC === 0
        ? res.success(null, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError();
    }
  }

  async denyFriendRequest(req, res) {
    const { _id } = req.user;
    const userIdTarget = req.params.userId;
    try {
      const result = await denyFriendRequestService(_id, userIdTarget);
      return result.EC === 0
        ? res.success(null, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError();
    }
  }

  async cancelFriend(req, res) {
    const { _id } = req.user;
    const userIdTarget = req.params.userId;
    try {
      const result = await cancelFriendService(_id, userIdTarget);
      return result.EC === 0
        ? res.success(null, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError();
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
      return res.InternalError();
    }
  }

  async updateAvatar(req, res) {
    const { _id } = req.user;
    const avatarUrl = req.file.path;
    try {
      const result = await updateUserService(_id, {
        profilePicture: avatarUrl,
      });
      return result.EC === 0
        ? res.success(result.result, "Cập nhật ảnh đại diện thành công")
        : res.error(result.EC, "Cập nhật ảnh đại diện không thành công");
    } catch (error) {
      return res.InternalError();
    }
  }

  async updateBackground(req, res) {
    const { _id } = req.user;
    const backgroundUrl = req.file.path;
    try {
      const result = await updateUserService(_id, {
        backgroundPicture: backgroundUrl,
      });
      return result.EC === 0
        ? res.success(result.result, "Cập nhật ảnh bìa thành công")
        : res.error(result.EC, "Cập nhật ảnh bìa không thành công");
    } catch (error) {
      return res.InternalError();
    }
  }

  async deleteAvatar(req, res) {
    const { _id } = req.user;
    try {
      const result = await updateUserService(_id, {
        profilePicture: null,
      });
      return result.EC === 0
        ? res.success(result.result, "Xóa ảnh đại diện thành công")
        : res.error(result.EC, "Xóa ảnh đại diện không thành công");
    } catch (error) {
      return res.InternalError();
    }
  }

  async deleteBackground(req, res) {
    const { _id } = req.user;
    try {
      const result = await updateUserService(_id, {
        backgroundPicture: null,
      });
      return result.EC === 0
        ? res.success(result.result, "Xóa ảnh bìa thành công")
        : res.error(result.EC, "Xóa ảnh bìa không thành công");
    } catch (error) {
      return res.InternalError();
    }
  }
}

export default new UserController();
