// Happy coding! Party! 

const express = require('express')
const hbs = require('hbs')
const { default: mongoose } = require('mongoose')

const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

hbs.registerPartials(`${__dirname}/views/partials`)

// DDBB
require('./db/db-connection')

// Model
const Coaster = require('./models/coaster.model')

app.get('/', (req, res) => {
    res.render('index-page')
})

app.get('/gallery', (req, res) => {

    Coaster
        .find()
        .sort({ title: 1 })
        .then(coasters => {
            res.render('coaster-gallery', { coasters })
        })
        .catch(err => console.log(err))
})

app.get('/longest-coasters', (req, res) => {
    Coaster
        .find({ length: { $gte: 100 } })
        .sort({ length: 1 })
        .then(coasters => {
            res.render('longest-coasters', { coasters })
        })
        .catch(err => console.log(err))
})

app.get('/craziest-coasters', (req, res) => {
    Coaster
        .find({ inversions: { $gt: 3 } })
        .sort({ inversions: 1 })
        .then(coasters => {
            res.render('craziest-coasters', { coasters })
        })
        .catch(err => console.log(err))
})

app.listen(5005, () => console.log('Servidor levantado en puerto 5005'))