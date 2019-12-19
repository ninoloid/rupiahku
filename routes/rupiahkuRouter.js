const express = require('express')
const rupiahkuRouter = express.Router();
const Rupiahku = require('../controllers/rupiahkuController')
const isLoggedIn = require('../middleware/isLoggedIn')

rupiahkuRouter.get('/manage/add-income', isLoggedIn, (req, res) => res.render('income.ejs'))
rupiahkuRouter.post('/manage/add-income', Rupiahku.add)
rupiahkuRouter.get('/manage/add-expense', isLoggedIn, (req, res) => res.render('expense.ejs'))
rupiahkuRouter.post('/manage/add-expense', Rupiahku.add)
rupiahkuRouter.get('/manage/report', isLoggedIn, (req, res) => res.render('report.ejs'))
rupiahkuRouter.post('/manage/report', Rupiahku.showReport)
rupiahkuRouter.get('/chart', isLoggedIn, Rupiahku.printChart)

module.exports = rupiahkuRouter