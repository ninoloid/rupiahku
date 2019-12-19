const Model = require('../models')
const getTagTypeId = require('../helpers/getTagTypeId')
const Sequelize = require('sequelize');
const UserMoney = Model.UserMoney
const User = Model.User
const Action = Model.Action
const Transaction = Model.Transaction

class RupiahkuController {

  static add(req, res) {
    if (req.body.nominal <= 0) res.render('error', { message: 'Tidak bisa menerima value negatif' })
    else {
      // User.findAll({ where: { isLogin: "true" }, include: UserMoney })
      User.findOne({ where: { username: req.session.user.username }, include: UserMoney })
        .then(user => {
          const tag = getTagTypeId(req.body.type).tag
          if (tag === 'income') {
            UserMoney.update({ totalMoney: Number(user.UserMoney.totalMoney) + Number(req.body.nominal) }, { where: { UserId: user.id } })
              .then(() => {
                Action.create({
                  nominal: req.body.nominal,
                  tag: getTagTypeId(req.body.type).tag,
                  description: req.body.description,
                  type_id: getTagTypeId(req.body.type).typeid
                })
                  .then(action => {
                    Transaction.create({
                      UserId: user.id,
                      ActionId: action.id
                    })
                      .then(success => res.redirect('/menu'))
                      // .catch(err => res.send(err.message))
                      .catch(err => res.render('error', { message: err.message }))
                  })
                  // .catch(err => res.send(err.message))
                  .catch(err => res.render('error', { message: err.message }))
              })
              .catch(err => res.send(err.message))
          } else if (tag === 'expense') {
            if (user.UserMoney.totalMoney >= req.body.nominal) {
              UserMoney.update({ totalMoney: Number(user.UserMoney.totalMoney) - Number(req.body.nominal) }, { where: { UserId: user.id } })
                .then(() => {
                  Action.create({
                    nominal: req.body.nominal,
                    tag: getTagTypeId(req.body.type).tag,
                    description: req.body.description,
                    type_id: getTagTypeId(req.body.type).typeid
                  })
                    .then(action => {
                      Transaction.create({
                        UserId: user.id,
                        ActionId: action.id
                      })
                        .then(success => res.redirect('/menu'))
                        // .catch(err => res.send(err.message))
                        .catch(err => res.render('error', { message: err.message }))
                    })
                    // .catch(err => res.send(err.message))
                    .catch(err => res.render('error', { message: err.message }))
                })
                // .catch(err => res.send(err.message))
                .catch(err => res.render('error', { message: err.message }))
            } else res.render('error', { message: err.message })
          }
        })
        // .catch(err => res.send(err.message))
        .catch(err => res.render('error', { message: err.message }))
    }
  }

  static showReport(req, res) {
    let type;
    switch (req.body.type) {
      case 'Pengeluaran': type = 'expense'; break;
      case 'Pendapatan': type = 'income'; break;
    }
    console.log(req.session)
    User.findOne({ where: { username: req.session.user.username }, include: UserMoney })
      .then(user => {
        let action;
        if (type) action = Action.findAll({ where: { tag: type }, include: User, order: [['tag', 'DESC'], ['id', 'DESC']] })
        // else action = Action.findAll({ include: User, order: [['type_id'], ['createdAt', 'DESC']] })
        else action = Action.findAll({ include: User, order: [['tag', 'DESC'], ['id', 'DESC']] })

        action
          .then(data => {
            const result = [];
            data.forEach(item => {
              if (item.Users[0].id === user.id) {
                result.push(item)
              }
            });
            const money = String(user.UserMoney.totalMoney)
            res.render('viewReport', { result, money })
          })
          // .catch(err => res.send(err.message))
          .catch(err => res.render('error', { message: err.message }))
      })
      // .catch(err => res.send(err.message))
      .catch(err => res.render('error', { message: err.message }))
  }
}

module.exports = RupiahkuController