Model = require('../models')
const UserMoney = Model.UserMoney
const User = Model.User
const Action = Model.Action
const Transaction = Model.Transaction
const getTagTypeId = require('../helpers/getTagTypeId')
const Sequelize = require('sequelize');

class RupiahkuController {
  static add(req, res) {
    User.findAll({ where: { isLogin: "true" } })
      .then(user => {
        const tag = getTagTypeId(req.body.type).tag
        if (tag === 'income') {
          UserMoney.increment('totalMoney', { by: req.body.nominal, where: { user_id: user[0].id } })
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
        }
        else if (tag === 'expense') {
          UserMoney.findAll({ where: { user_id: user[0].id } })
            .then(result => {
              if (result[0].totalMoney >= req.body.nominal) {
                UserMoney.decrement('totalMoney', { by: req.body.nominal, where: { user_id: user[0].id } })
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
                      .then(() => res.redirect('/menu'))
                      .catch(err => res.send(err.message))
                  })
                  .catch(err => res.send(err.message))
              }
              else res.send('uangnya kurang')
            })
            .catch(err => res.send(err.message))
        }
      })
      .catch(err => res.send(err.message))
  }

  static showReport(req, res) {
    let type;
    switch (req.body.type) {
      case 'Pengeluaran': type = 'expense'; break;
      case 'Pendapatan': type = 'income'; break;
    }
    // res.send(req.body.type) // pengeluaran, pendapatan, semua
    let action;
    if (type) action = Action.findAll({ where: { tag: type }, include: User, order: [['createdAt', 'DESC']] })
    else action = Action.findAll({ include: User, order: [['type_id'], ['createdAt', 'DESC']] })

    // Action.findAll({ include: User, order: ['type_id', 'createdAt'] })
    // Action.findAll({ where: { tag: type }, include: User })
    // .then(data => res.render('enrolledStudent', { data, scoring }))
    action
      .then(data => res.send(data))
      .catch(err => res.send(err.message))

  }
}

module.exports = RupiahkuController