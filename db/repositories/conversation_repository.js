const dbModel = require("../models");

class ConversationRepository {
  static async createConversation(req, data) {
    try {
      const result = await dbModel.conversation.create(data);
      if (result === null) {
        return false;
      } else {
        req.context.log("createConversation:", result.dataValues.id);
        return {
          success: true,
          conversationId: result.dataValues.id,
        };
      }
    } catch (error) {
      req.context.log("createConversation error:", error);
    }
  }

  static async getConversation(req, condition) {
    try {
      const result = await dbModel.conversation.findOne({
        where: condition,
      });

      return result;
    } catch (error) {
      req.context.log("getConversation error:", error);
      return null;
    }
  }
}

module.exports = ConversationRepository;
