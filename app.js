const express = require('express')
const path = require('path')

const app = express()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))

const mongoose = require('./db/db-connection')

const data = require('./coasters-data.json')

const Coaster = require('./model/coaster.model')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/coasters-gallery', (req, res) => {
    Coaster
        .find()
        .sort({ title: 1 })
        .then(coasters => {
            res.render('gallery', { coasters })
        })
        .catch(err => console.log(err))
})

app.get('/longest', (req, res) => {
    Coaster
        .find({ length: { $gt: 100 } })
        .sort({ length: 1 })
        .then(coasters => {
            res.render('longest', { coasters })
        })
        .catch(err => console.log(err))
})

app.get('/craziest', (req, res) => {
    Coaster
        .find({ inversions: { $gt: 3 } })
        .sort({ inversions: 1 })
        .then(coasters => {
            res.render('craziest', { coasters })
        })
        .catch(err => console.log(err))
})

app.listen(5005, () => console.log('App listening!'))