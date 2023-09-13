"use strict";
const { Model } = require("sequelize");
const moment = require("moment");
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Conversation.belongsTo(models.room, {
        foreignKey: "roomId",
      });
      Conversation.belongsTo(models.user, {
        foreignKey: "userId",
      });
    }
  }
  Conversation.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      message: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "message",
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
      },
      roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "roomId",
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "created_at",
        get: function () {
          return moment(this.getDataValue("createdAt")).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        },
      },
    },
    {
      sequelize,
      modelName: "conversation",
      timestamps: false,
    }
  );
  return Conversation;
};
