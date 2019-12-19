'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Type extends Model { }
  Type.init({
    name: DataTypes.STRING,
    tag: DataTypes.STRING
  }, { sequelize });
  return Type;
};