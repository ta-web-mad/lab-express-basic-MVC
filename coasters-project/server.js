// Happy coding! Party! 
const express = require('express')
const hbs = require('hbs')
const path = require('path')

const app = express()

app.use(express.static('public'))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

hbs.registerPartials(`${__dirname}/views/partials`)

require('./db/db-connection')

const Coaster = require('./models/coaster.model')

app.get('/', (req, res) => {

    res.render('index')
})

app.get('/coasters', (req, res) => {

    Coaster
        .find()
        .sort({ title: 1 })
        .then(coasters => {
            res.render('coasters', { coasters })
        })
        .catch(err => console.log(err))
})

app.get('/longests', (req, res) => {

    Coaster
        .find({ length: { $gt: 1000 } })
        .sort({ length: -1 })
        .then(coasters => {
            res.render('longests', { coasters })
        })
        .catch(err => console.log(err))
})

app.get('/craziests', (req, res) => {

    Coaster
        .find({ inversions: { $gt: 3 } })
        .sort({ inversions: -1 })
        .then(coasters => {
            res.render('craziests', { coasters })
        })
        .catch(err => console.log(err))
})


app.listen(5005, () => console.log('Servidor levantado en puerto 5005'))



