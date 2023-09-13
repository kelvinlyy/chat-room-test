const dbModel = require("../models");

class UserRepository {
  static async createUser(req, data) {
    try {
      const result = await dbModel.user.create(data);
      if (result === null) {
        return false;
      } else {
        req.context.log("createUser:", result.dataValues.id);
        return {
          success: true,
          userId: result.dataValues.id,
        };
      }
    } catch (error) {
      req.context.log("createUser error:", error);
    }
  }

  static async getUser(req, condition) {
    try {
      const result = await dbModel.user.findOne({
        where: condition,
      });

      return result;
    } catch (error) {
      req.context.log("getUser error:", error);
      return null;
    }
  }
}

module.exports = UserRepository;
