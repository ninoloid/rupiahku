'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class UserMoney extends Model { }
  UserMoney.init({
    totalMoney: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, { sequelize });
  return UserMoney;
};