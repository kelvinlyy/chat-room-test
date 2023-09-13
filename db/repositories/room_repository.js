const dbModel = require("../models");

class RoomRepository {
  static async createRoom(data) {
    try {
      const result = await dbModel.room.create(data);
      if (result === null) {
        return false;
      } else {
        console.log("createRoom:", result.dataValues.id);
        return {
          success: true,
          roomId: result.dataValues.id,
        };
      }
    } catch (error) {
      console.log("createRoom error:", error);
    }
  }

  static async getRoom(req, condition) {
    try {
      const result = await dbModel.room.findOne({
        where: condition,
      });

      return result;
    } catch (error) {
      console.log("getRoom error:", error);
      return null;
    }
  }
}

module.exports = RoomRepository;
