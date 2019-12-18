const express = require('express')
const app = express()
const User = require('./controllers/userController')
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));
app.use('/rupiahku', require('./routes/rupiahkuRouter'))
app.get('/login', (req, res) => res.render('loginForm.ejs'))
app.post('/login', User.userLogin)


app.listen(3000, () => console.log('Express is running on port 3000'))