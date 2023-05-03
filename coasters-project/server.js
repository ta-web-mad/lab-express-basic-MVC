require('./db/database-connection')

const express = require('express')
const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

const Coaster = require('./models/coaster.model')


app.get('/', (req, res) => {
    res.render('index-page')
})

app.get('/coasters-page', (req, res) => {

    Coaster
        .find().sort({ title: 1 })
        .then(allCoasters => res.render('coasters-page', { coasters: allCoasters }))
        .catch(err => console.log(err))
})

app.get('/longest-page', (req, res) => {

    Coaster
        .find({ length: { $gt: 100 } })
        .then(mostLongest => res.render('longest-page', { coasterLong: mostLongest }))
        .catch(err => console.log(err))
})

app.get('/craziest-page', (req, res) => {
    Coaster
        .find({ inversions: { $gt: 3 } })
        .then(mostCraziest => res.render('craziest-page', { coasterCrazy: mostCraziest }))
        .catch(err => console.log(err))
})

app.listen(5005, () => console.log('SERVIDOR LEVANTADO EN 5005'))

