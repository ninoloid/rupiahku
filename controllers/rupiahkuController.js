Model = require('../models')
const UserMoney = Model.UserMoney
const User = Model.User
const Action = Model.Action
const Transaction = Model.Transaction
const getTagTypeId = require('../helpers/getTagTypeId')
const Sequelize = require('sequelize');

class RupiahkuController {

  static add(req, res) {
    if (req.body.nominal <= 0) res.send('Input yg bener dong')
    else {
      User.findAll({ where: { isLogin: "true" }, include: UserMoney })
        .then(user => {
          const tag = getTagTypeId(req.body.type).tag
          if (tag === 'income') {
            UserMoney.update({ totalMoney: Number(user[0].UserMoney.totalMoney) + Number(req.body.nominal) }, { where: { UserId: user[0].id } })
              .then(() => {
                Action.create({
                  nominal: req.body.nominal,
                  tag: getTagTypeId(req.body.type).tag,
                  description: req.body.description,
                  type_id: getTagTypeId(req.body.type).typeid
                })
                  .then(action => {
                    Transaction.create({
                      UserId: user[0].id,
                      ActionId: action.id
                    })
                      .then(success => res.redirect('/menu'))
                      .catch(err => res.send(err.message))
                  })
                  .catch(err => res.send(err.message))
              })
              .catch(err => res.send(err.message))
          } else if (tag === 'expense') {
            if (user[0].UserMoney.totalMoney >= req.body.nominal) {
              UserMoney.update({ totalMoney: Number(user[0].UserMoney.totalMoney) - Number(req.body.nominal) }, { where: { UserId: user[0].id } })
                .then(() => {
                  Action.create({
                    nominal: req.body.nominal,
                    tag: getTagTypeId(req.body.type).tag,
                    description: req.body.description,
                    type_id: getTagTypeId(req.body.type).typeid
                  })
                    .then(action => {
                      Transaction.create({
                        UserId: user[0].id,
                        ActionId: action.id
                      })
                        .then(success => res.redirect('/menu'))
                        .catch(err => res.send(err.message))
                    })
                    .catch(err => res.send(err.message))
                })
                .catch(err => res.send(err.message))
            } else res.send('uangnya kurang')
          }
        })
        .catch(err => res.send(err.message))
    }
  }

  static showReport(req, res) {
    let type;
    switch (req.body.type) {
      case 'Pengeluaran': type = 'expense'; break;
      case 'Pendapatan': type = 'income'; break;
    }
    User.findAll({ where: { isLogin: "true" }, include: UserMoney })
      .then(user => {
        let action;
        if (type) action = Action.findAll({ where: { tag: type }, include: User, order: [['createdAt', 'DESC']] })
        else action = Action.findAll({ include: User, order: [['type_id'], ['createdAt', 'DESC']] })

        action
          .then(data => {
            const result = [];
            data.forEach(item => {
              if (item.Users[0].id === user[0].id) {
                result.push(item)
              }
            });
            const money = String(user[0].UserMoney.totalMoney)
            res.render('viewReport', { result, money })
          })
          .catch(err => res.send(err.message))
      })
      .catch(err => res.send(err.message))


  }


  // static showReport(req, res) {
  //   let type;
  //   switch (req.body.type) {
  //     case 'Pengeluaran': type = 'expense'; break;
  //     case 'Pendapatan': type = 'income'; break;
  //   }
  //   // User.findAll({ where: { isLogin: "true" }, include: UserMoney })
  //   //   .then(user => res.send(user))
  //   //   .catch(err => res.send(err.message))
  //   let action;
  //   if (type) action = Action.findAll({ where: { tag: type, description: 'asd' }, include: User, order: [['createdAt', 'DESC']] })
  //   else action = Action.findAll({ include: User, order: [['type_id'], ['createdAt', 'DESC']] })

  //   action
  //     .then(data => res.send(data))
  //     .catch(err => res.send(err.message))

  // }
}

module.exports = RupiahkuController