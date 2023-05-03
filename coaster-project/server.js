const mongoose = require('./db/database-connection')

const express = require('express')
const Coaster = require('./models/coaster.model')
const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    res.render('index-page')
})

app.get('/coasters-gallery', (req, res) => {
    Coaster
        .find()
        .sort({ title: 1 })
        .then(allRollerCoasters => res.render('coasters-gallery', { coaster: allRollerCoasters }))
        .catch(err => console.log(err))
})

app.get('/longest', (req, res) => {
    Coaster
        .find({ length: { $gte: 100 } })
        .sort()
        .then(allRollerCoasters => res.render('longest', { coaster: allRollerCoasters }))
        .catch(err => console.log(err))
})

app.get('/craziest', (req, res) => {
    Coaster
        .find({ inversions: { $gte: 3 } })
        .sort()
        .then(allRollerCoasters => res.render('craziest', { coaster: allRollerCoasters }))
        .catch(err => console.log(err))
})

app.listen(5005, () => console.log('SERVIDOR LEVANTADO EN 5005'))