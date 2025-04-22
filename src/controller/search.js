import { searchUsersService } from "../service/search.js";

class SearchController {
  async searchUsers(req, res) {
    const { _id } = req.user;
    const { keyword } = req.query;
    try {
      const result = await searchUsersService(_id, keyword);
      return result.EC === 0
        ? res.success(result.result, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError();
    }
  }
}

export default new SearchController();
