Model = require('../models')
const UserMoney = Model.UserMoney
const User = Model.User
const Action = Model.Action
const Transaction = Model.Transaction
const getTagTypeId = require('../helpers/getTagTypeId')

class RupiahkuController {
  static add(req, res) {
    User.findAll({ where: { isLogin: "true" } })
      .then(user => {
        // UserMoney.update({
        //   totalMoney: += req.body.nominal
        // }, { where: { user_id: data[0].id } })
        UserMoney.increment('totalMoney', { by: req.body.nominal, where: { user_id: user[0].id } })
          .then(() => {
            // console.log('req.body nih ==========>', req.body)
            console.log('user nih ==============>', user)
            // console.log(getTagTypeId(req.body.type).typeid)

            Action.create({
              nominal: req.body.nominal,
              tag: getTagTypeId(req.body.type).tag,
              description: req.body.description,
              type_id: getTagTypeId(req.body.type).typeid
            })
              .then(action => {
                console.log(action)
                Transaction.create({
                  user_id: user[0].id,
                  action_id: action.id
                })
                  .then(success => res.send('update berhasil'))
                  .catch(err => res.send(err.message))
                // res.redirect('/subjects')
              })
              .catch(err => res.send(err.message))
            // res.redirect('/students')
            // res.send('update berhasil')
          })
          .catch(err => res.send(err.message))
      })
      .catch(err => res.send(err.message))
  }
}

module.exports = RupiahkuController