"use strict";
const { Model } = require("sequelize");
const moment = require("moment");
module.exports = (sequelize, DataTypes) => {
  class UserAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserAccount.hasMany(models.user, {
        as: "users",
        foreignKey: "userAccountId",
        onDelete: "cascade",
      });
    }
  }
  UserAccount.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      titleTc: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "title_tc",
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
      modelName: "user_account",
      timestamps: false,
    }
  );
  return UserAccount;
};
