'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class User extends Model { }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    isLogin: DataTypes.BOOLEAN
  }, { sequelize });
  User.associate = function (models) {
    User.belongsToMany(models.Action, { through: models.Transaction })
  };
  return User;
};