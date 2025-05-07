import {
  createConversationService,
  getUserConversationsService,
  getConversationWithService,
} from "../service/conversation.js";

class ConversationController {
  async createConversation(req, res) {
    const { _id } = req.user;
    const { memberIds } = req.body;
    try {
      const result = await createConversationService(_id, memberIds);
      return result.EC === 0
        ? res.success(result.result, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError();
    }
  }

  async getConversations(req, res) {
    const { _id } = req.user;
    try {
      const result = await getUserConversationsService(_id);
      return res.success(result.result, result.EM);
    } catch (error) {
      return res.InternalError();
    }
  }

  async getConversationWith(req, res) {
    const { _id } = req.user;
    const { friendId } = req.params;
    try {
      const result = await getConversationWithService(_id, friendId);
      return res.success(result.result, result.EM);
    } catch (error) {
      return res.InternalError();
    }
  }
}

export default new ConversationController();
