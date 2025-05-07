import {
  sendMessageService,
  getMessagesService,
  readMessageService,
} from "../service/message.js";

class MessageController {
  async sendMessage(req, res) {
    const { _id } = req.user;
    const { conversationId, message, receiveUserId } = req.body;
    try {
      const result = await sendMessageService(
        _id,
        conversationId,
        message,
        receiveUserId
      );
      return result.EC === 0
        ? res.success(result.result, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      console.log(error);
      return res.InternalError();
    }
  }

  async getMessages(req, res) {
    const { conversationId } = req.params;
    try {
      const result = await getMessagesService(conversationId);
      return result.EC === 0
        ? res.success(result.result, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError();
    }
  }

  async readMessage(req, res) {
    const { _id } = req.user;
    const { conversationId } = req.params;
    try {
      const result = await readMessageService(_id, conversationId);
      return result.EC === 0
        ? res.success(result.result, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError();
    }
  }
}

export default new MessageController();
