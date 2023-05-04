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
        .find().sort({ title: 1 })
        .then(allCoasters => res.render('coasters-gallery', { coasters: allCoasters }))
        .catch(err => console.log(err))

})
app.get('/longest', (req, res) => {

    Coaster
        .find({ length: { $gt: 1000 } }).sort()
        .then(allCoasters => res.render('longest', { coasters: allCoasters }))
        .catch(err => console.log(err))

})
app.listen(27017, () => console.log("ESTOY PROBANDO"))