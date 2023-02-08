// Happy coding! Party! 
const express = require('express')

const hbs = require('hbs')

const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

// DDBB
require('./db/db-connection')

// MODEL
const Coaster = require('./models/coaster.model')

// PARTIALS
hbs.registerPartials(`${__dirname}/views/partials`)

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/coaster-gallery', (req, res) => {
    Coaster
        .find()
        .sort({ title: 1 })
        .then(coasters => {
            res.render('coaster-gallery', { coasters })
        })
        .catch(err => console.log(err))
})

app.get('/longest-gallery', (req, res) => {
    Coaster
        .find({ length: { $gt: 100 } })
        .sort({ length: 1 })
        .then(coasters => {
            res.render('longest-gallery', { coasters })
        })
        .catch(err => console.log(err))
})

app.get('/craziest-gallery', (req, res) => {
    Coaster
        .find({ inversions: { $gt: 3 } })
        .sort({ inversions: 1 })
        .then(coasters => {
            res.render('craziest-gallery', { coasters })
        })
        .catch(err => console.log(err))
})

app.listen(5005, () => console.log('Servidor levantado en puerto 5005'))

