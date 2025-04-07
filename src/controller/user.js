import { getUserService, updateUserService } from "../service/user.js";

class UserController {
  async getUser(req, res) {
    const { userId } = req.user;
    const userIdResponse =  req.params.userId;
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
    const dataUpdate = req.body;
    try {
      const result = await updateUserService(userId, dataUpdate);
      return result.EC === 0
        ? res.success(result.result, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError(error.message);
    }
  }
}

export default new UserController();
