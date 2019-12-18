const express = require('express')
const rupiahkuRouter = express.Router();
const Rupiahku = require('../controllers/rupiahkuController')
// const StudentSubject = require('../controllers/studentSubjectController')

// rupiahkuRouter.get('/', Student.showAll)
rupiahkuRouter.get('/manage/add-income', (req, res) => res.render('income.ejs'))
rupiahkuRouter.post('/manage/add-income', Rupiahku.add)
rupiahkuRouter.get('/manage/add-expense', (req, res) => res.render('expense.ejs'))
rupiahkuRouter.post('/manage/add-expense', Rupiahku.add)
rupiahkuRouter.get('/manage/report', (req, res) => res.render('report.ejs'))
rupiahkuRouter.post('/manage/report', Rupiahku.showReport)
// rupiahkuRouter.get('/manage/home', (req, res) => res.render('home.ejs'))

// rupiahkuRouter.post('/add', Student.add)
// rupiahkuRouter.get('/edit/:id', Student.findStudent);
// rupiahkuRouter.post('/edit/:id', Student.update);
// rupiahkuRouter.get('/delete/:id', Student.delete);
// rupiahkuRouter.get('/:id/add-subject', Student.addSubject)
// rupiahkuRouter.post('/:id/add-subject', StudentSubject.add)

module.exports = rupiahkuRouter