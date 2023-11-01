require('./db/database-connection')

const express = require('express')
const Coaster = require('./models/coaster-model')
const hbs = require('hbs');

hbs.registerPartials(`${__dirname}/views/partials`);

const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')


app.get('/', (req, res) => {
    res.render('home-page')
})

app.get('/coasters-gallery', (req, res) => {
    Coaster
        .find().sort({ title: 1 })
        .then(coasters => res.render('coasters-gallery', { coasters }))
        .catch(error => console.log('DATABASE ERROR: ', error))
})

app.get('/longest', (req, res) => {
    Coaster
        .find({ length: { $gt: 100 } }).sort({ length: -1 })
        .then(coasters => res.render('longest', { coasters }))
        .catch(error => console.log('DATABASE ERROR: ', error))
})

app.get('/craziest', (req, res) => {
    Coaster
        .find({ inversions: { $gt: 3 } }).sort({ inversions: -1 })
        .then(coasters => res.render('craziest', { coasters }))
        .catch(error => console.log('DATABASE ERROR: ', error))
})

app.listen(5005, () => console.log('Server running on 5005'))

