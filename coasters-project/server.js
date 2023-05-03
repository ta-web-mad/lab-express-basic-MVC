
// Require Dependences & DB
require('./db/database-connection')
const express = require('express')

// Instance Express
const app = express()

// Config
app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

// Import Model
const Coaster = require('./models/coaster.model')


// Routes
app.get('/', (req, res) => {
    res.render("home-page")
})

app.get('/gallery', (req, res) => {
    Coaster
        .find()
        .sort({ title: 1 })
        .then(allCoasters => {
            res.render("coasters-gallery", { coasters: allCoasters })
        })
        .catch(err => console.log(err))
})
app.get('/longest', (req, res) => {
    Coaster
        .find({ length: { $gte: 1000 } })
        .then(allLongCoasters => {
            res.render("long-coasters", { longCoasters: allLongCoasters })
        })
        .catch(err => console.log(err))
})
app.get('/craziest', (req, res) => {
    Coaster
        .find({ inversions: { $gt: 3 } })
        .then(allCraziestCoasters => {
            res.render("crazy-coasters", { crazyCoasters: allCraziestCoasters })
        })
        .catch(err => console.log(err))
})

// Conectar el Servidor
app.listen(5005, () => console.log('SERVIDOR LEVANTADO EN 5005'))
