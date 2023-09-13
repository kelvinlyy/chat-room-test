"use strict";
const { Model } = require("sequelize");
const moment = require("moment");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.conversation, {
        as: "conversations",
        foreignKey: "userId",
        onDelete: "cascade",
      });

      User.belongsTo(models.user_account, {
        foreignKey: "userAccountId",
      });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userAccountId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "user_account_id",
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
      modelName: "user",
      timestamps: false,
    }
  );
  return User;
};
