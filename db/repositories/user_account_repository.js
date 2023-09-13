const dbModel = require("../models");

class UserAccountRepository {
  static async createUserAccount(req, data) {
    try {
      const result = await dbModel.user_account.create(data);
      if (result === null) {
        return false;
      } else {
        req.context.log("createUserAccount:", result.dataValues.id);
        return {
          success: true,
          userAccountId: result.dataValues.id,
        };
      }
    } catch (error) {
      req.context.log("createUserAccount error:", error);
    }
  }

  static async getUserAccount(req, condition) {
    try {
      const result = await dbModel.user_account.findOne({
        where: condition,
      });

      return result;
    } catch (error) {
      req.context.log("getUserAccount error:", error);
      return null;
    }
  }
}

module.exports = UserAccountRepository;
