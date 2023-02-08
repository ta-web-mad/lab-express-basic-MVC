const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const Coaster = require('./models/coaster.model')


app.use(express.static('public'))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

hbs.registerPartials(path.join(__dirname, 'views/partials'))

require("./db/db-connection")

app.get('/', (req, res) => {
    res.render('index-page')
})
app.get('/coasters-gallery', (req, res) => {
    Coaster
        .find()
        .sort({ title: 1 })
        .then(allCoasters => {
            res.render('coasters-gallery', { allCoasters })
        })
        .catch(err => console.log(err))
})

app.get('/longest', (req, res) => {
    Coaster
        .find({ length: { $gt: 100 } })
        .sort({ title: 1 })
        .then(allCoasters => {
            res.render('longest', { allCoasters })
        })
        .catch(err => console.log(err))
})
app.get('/craziest', (req, res) => {
    Coaster
        .find({ inversions: { $gt: 3 } })
        .sort({ title: 1 })
        .then(allCoasters => {
            res.render('craziest', { allCoasters })
        })
        .catch(err => console.log(err))
})

app.listen(5005, () => console.log('server up on port 5005!'))
