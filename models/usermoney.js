'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class UserMoney extends Model { }
  UserMoney.init({
    totalMoney: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, { sequelize });
  // UserMoney.associate = function (models) {
  //   // associations can be defined here
  // };
  return UserMoney;
};