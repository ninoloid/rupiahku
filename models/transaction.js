'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Transaction extends Model { }
  Transaction.init({
    user_id: DataTypes.INTEGER,
    action_id: DataTypes.INTEGER
  }, { sequelize });
  // Transaction.associate = function (models) {
  //   // associations can be defined here
  // };
  return Transaction;
};