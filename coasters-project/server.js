require('./db/database-connection')

const express = require('express')
const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

const Coaster = require('./models/coaster.model')

app.get('/', (req, res) => {
    res.render('home_page')
})
app.get('/coasters-gallery', (req, res) => {
    Coaster
        .find()
        .sort({ title: 1 })
        .then(allCoasters => { res.render('rollercoaster', { coaster: allCoasters }) })
        .catch(err => console.log(err))
})
app.get('/longest', (req, res) => {
    Coaster
        .find({ length: { $gt: 700 } })
        .then(allLongCoasters => { res.render('longest', { longCoaster: allLongCoasters }) })
        .catch(err => console.log(err))
})
app.get('/craziest', (req, res) => {
    Coaster
        .find({ inversions: { $gt: 3 } })
        .then(allCrazyCoasters => { res.render('craziest', { crazyCoaster: allCrazyCoasters }) })
        .catch(err => console.log(err))
})


app.listen(5005, () => console.log('SERVIDOR LEVANTADO EN 5005'))
