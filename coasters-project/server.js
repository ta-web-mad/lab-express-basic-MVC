const express = require('express')
const hbs = require('hbs')
const path = require('path')

const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

require('./db/db-connections')
const Coaster = require('./models/coasters.models')

app.get('/', (req, res) => {
    res.render('index-page')
})
app.get('/coaster', (req, res) => {

    Coaster
        .find()
        .sort({ title: 1 })
        .then(allCoastersFromDB => {
            res.render('coasters-page', { coasters: allCoastersFromDB })
        })
        .catch(err => console.log(err))
})
app.get('/longest', (req, res) => {

    Coaster
        .find({ length: { $gt: 100 } })
        .sort({ title: 1 })
        .then(allCoastersFromDB => {
            res.render('longest', { coasters: allCoastersFromDB })
        })
        .catch(err => console.log(err))
})
app.get('/craziest', (req, res) => {

    Coaster
        .find({ inversions: { $gt: 3 } })
        .sort({ title: 1 })
        .then(allCoastersFromDB => {
            res.render('craziest', { coasters: allCoastersFromDB })
        })
        .catch(err => console.log(err))
})
app.listen(5005, () => console.log('Servidor levantado en puerto 5005'))