import {
  addSearchHistoryService,
  deleteOneSearchHistoryByIndexService,
  getSearchHistoryService,
} from "../service/userHistory.js";

class UserHistoryController {
  async addSearchHistory(req, res) {
    const userId = req.user._id;
    const { type, keyword, userIdTarget } = req.body;
    try {
      const result = await addSearchHistoryService(userId, {
        type,
        keyword,
        userIdTarget,
      });

      return result.EC === 0
        ? res.success(result.result, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError();
    }
  }

  async getSearchHistory(req, res) {
    const userId = req.user._id;
    try {
      const result = await getSearchHistoryService(userId);
      return result.EC === 0
        ? res.success(result.result, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError();
    }
  }

  async deleteOneSearchHistoryByIndex(req, res) {
    try {
      const userId = req.user._id;
      const { index } = req.params;

      const result = await deleteOneSearchHistoryByIndexService(userId, index);

      return result.EC === 0
        ? res.success(result.result, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError();
    }
  }
}

export default new UserHistoryController();
