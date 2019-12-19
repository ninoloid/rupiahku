'use strict';
module.exports = (sequelize, DataTypes) => {
  // const Rupiahku = require('../controllers/rupiahkuController')
  // console.log(sequelize.models)
  const Model = sequelize.Sequelize.Model

  class User extends Model { }
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        isUnique(value) {
          return User.findOne({ where: { username: value } })
            .then(data => {
              if (data) throw new Error('Username sudah dipakai')
            })
        }
      }
    },
    password: DataTypes.STRING,
    dateOfBirth: DataTypes.DATEONLY
  }, {
    sequelize,
    hooks: {
      afterCreate: user => {
        // console.log(sequelize.models)
        const UserMoney = sequelize.models.UserMoney
        UserMoney.create({
          totalMoney: 0,
          UserId: user.id
        })
      }
    }
  });
  User.associate = function (models) {
    User.belongsToMany(models.Action, { through: models.Transaction })
    User.hasOne(models.UserMoney)
  };
  return User;
};