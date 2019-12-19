Model = require('../models')
const User = Model.User
const UserMoney = Model.UserMoney

class UserController {
  static userLogin(req, res) {
    User.findAll({ where: { username: req.body.username } })
      .then(data => {
        User.findAll({ where: { isLogin: true } })
          .then(result => {
            if (result.length === 0) {
              if (data[0].password === req.body.password) {
                User.update({
                  isLogin: true
                }, {
                  where: {
                    id: data[0].id
                  }
                })
                UserMoney.findAll({ where: { id: data[0].id } })
                  .then(money => res.render('home.ejs', { data, money }))
                  .catch(err => res.send(err.message))
              } else res.send('Password incorrect')
            } else res.send('udah ada yg login')
          })
          .catch(err => res.send(err.message))
      })
      .catch(err => res.send(err.message))
  }

  static userLogout(req, res) {
    User.findAll({ where: { isLogin: true } })
      .then(result => {
        if (result.length > 0) {
          User.update({
            isLogin: false
          }, {
            where: {
              isLogin: true
            }
          })
        }
        res.redirect('/login')
      })
      .catch(err => res.send(err.message))
  }

  static userRegister(req, res) {

  }
}

module.exports = UserController