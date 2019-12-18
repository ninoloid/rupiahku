Model = require('../models')
const User = Model.User
const UserMoney = Model.UserMoney

class UserController {
  static userLogin(req, res) {
    User.findAll({ where: { username: req.body.username } })
      .then(data => {
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
            // .then(money => res.redirect('home.ejs', { data, money }))
            .catch(err => res.send(err.message))
        } else res.send('Password incorrect')
      })
      .catch(err => res.send(err.message))
  }
}

module.exports = UserController