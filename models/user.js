'use strict';

import { Sequelize, Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail : {
          msg : "Please write valid email"
        }
      }
    }, 
    password: DataTypes.STRING,
    encryption_key: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};