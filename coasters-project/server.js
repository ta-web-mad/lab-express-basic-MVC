const express = require('express')

const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')


require('./db/database-connection')
const Coaster = require('./models/coaster.model')
app.get('/', (req, res) => {
    res.render('home-page')
})
app.get('/diversion', (req, res) => {
    Coaster
        .find()
        .sort({ title: 1 })
        .then((coasters) => {
            console.log(coasters)
            res.render('coasters-gallery', { coasters })
        })

        .catch(err => console.log('ERROR:', err))
})
app.get('/larguisimas', (req, res) => {
    Coaster
        .find({ length: { $gt: 1000 } })
        .then((coasters) => {
            console.log(coasters)
            res.render('longest-coasters', { coasters })
        })

        .catch(err => console.log('ERROR:', err))
})
app.get('/loquisimas', (req, res) => {
    Coaster
        .find({ inversions: { $gt: 3 } })
        .then((coasters) => {
            console.log(coasters)
            res.render('craziest-coasters', { coasters })
        })

        .catch(err => console.log('ERROR:', err))
})

app.listen(5005, () => console.log('Server listening on port 5005'))