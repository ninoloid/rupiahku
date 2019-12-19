const Model = require('../models')
const bcrypt = require('bcrypt')
const passwordHash = require('../helpers/hash')
const User = Model.User
const UserMoney = Model.UserMoney



class UserController {
  static userLogin(req, res) {
    User.findOne({ where: { username: req.body.username } })
      .then(user => {
        if (!user) res.render('error', { message: 'User belum terdaftar' })
        else {
          const valid = bcrypt.compareSync(req.body.password, user.password)
          if (valid) {
            UserMoney.findOne({ where: { UserId: user.id } })
              .then(money => {
                req.session.user = user.get()
                res.render('home.ejs', { user, money })
              })
              // .catch(err => res.send(err.message))
              .catch(err => res.render('error', { message: err.message }))
            // } else res.send('Password invalid')
          } else res.render('error', { message: 'Password invalid' })
        }
      })
      // .catch(err => res.send(err.message))
      .catch(err => res.render('error', { message: err.message }))
  }

  // static userLogin(req, res) {
  //   User.findAll({ where: { username: req.body.username } })
  //     .then(data => {
  //       User.findAll({ where: { isLogin: true } })
  //         .then(result => {
  //           if (result.length === 0) {
  //             if (data[0].password === req.body.password) {
  //               User.update({
  //                 isLogin: true
  //               }, {
  //                 where: {
  //                   id: data[0].id
  //                 }
  //               })
  //               UserMoney.findAll({ where: { id: data[0].id } })
  //                 .then(money => res.render('home.ejs', { data, money }))
  //                 .catch(err => res.send(err.message))
  //             } else res.send('Password incorrect')
  //           } else res.send('udah ada yg login')
  //         })
  //         .catch(err => res.send(err.message))
  //     })
  //     .catch(err => res.send(err.message))
  // }

  static userLogout(req, res) {
    User.findOne({ where: { username: req.session.user.username } })
      .then((found) => {
        if (found) {
          req.session.destroy(err => res.send(err))
          res.redirect('/login')
        }
      })
      .catch(err => res.send(err.message))
  }

  // static userLogout(req, res) {
  //   User.findAll({ where: { isLogin: true } })
  //     .then(result => {
  //       if (result.length > 0) {
  //         User.update({
  //           isLogin: false
  //         }, {
  //           where: {
  //             isLogin: true
  //           }
  //         })
  //       }
  //       res.redirect('/login')
  //     })
  //     .catch(err => res.send(err.message))
  // }

  static userRegister(req, res) {
    if (req.body.password !== req.body.retype) res.render('error', { message: 'Password dan Retype Password Tidak Sesuai' })
    else {
      const user = {
        username: req.body.username,
        password: passwordHash(req.body.password)
      }
      User.create(user)
        .then(data => {
          req.session.user = data.get()
          res.redirect('/menu')
        })
        // .catch(err => res.send(err.message))
        .catch(err => res.render('error', { message: err.message }))
    }
  }
}

module.exports = UserController