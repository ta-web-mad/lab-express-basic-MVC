require('./db/database-connections')

const express = require('express')
const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

const Coaster = require('./models/coaster.model.js')

app.get('/', (req, res) => {
    res.render('./index-page')
})

app.get('/coasters', (req, res) => {
    Coaster
        .find()
        .sort({ title: 1 })
        .then(allCoasters => {
            res.render('./coasters', { coaster: allCoasters })
        })
        .catch(err => console.log(err))
})

app.get('/longest', (req, res) => {
    Coaster
        .find({ length: { $gt: 1000 } })
        .then(allCoasters => {
            res.render('./longest', { coaster: allCoasters })
        })
        .catch(err => console.log(err))
})

app.get('/craziest', (req, res) => {
    Coaster
        .find({ inversions: { $gt: 3 } })
        .sort({ inversions: -1 })
        .then(allCoasters => {
            res.render('./craziest', { coaster: allCoasters })
        })
        .catch(err => console.log(err))
})

app.listen(5005, () => console.log('SERVIDOR LEVANTADO EN PUERTO 5005'))