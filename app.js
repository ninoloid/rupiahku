const express = require('express')
const User = require('./controllers/userController')
const session = require('express-session')
const isLoggedIn = require('./middleware/isLoggedIn')
const app = express()
const port = process.env.PORT || 3001

app.use(session({
  secret: 'ninoloid',
  resave: false,
  saveUninitialized: true
}))

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));
app.use('/rupiahku', require('./routes/rupiahkuRouter'))

app.get('/', isLoggedIn, (req, res) => res.render('menu'))
app.get('/login', (req, res) => res.render('loginForm'))
app.post('/login', User.userLogin)
app.get('/menu', isLoggedIn, (req, res) => res.render('menu'))
app.get('/logout', isLoggedIn, User.userLogout)
app.get('/register', (req, res) => res.render('register'))
app.post('/register', User.userRegister)

app.listen(port, () => console.log('Express is running on port', port))