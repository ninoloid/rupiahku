'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Action extends Model { }
  Action.init({
    nominal: DataTypes.INTEGER,
    tag: DataTypes.STRING,
    description: DataTypes.STRING,
    type_id: DataTypes.INTEGER
  }, { sequelize });
  Action.associate = function (models) {
    Action.belongsToMany(models.User, { through: models.Transaction })
  };
  return Action;
};