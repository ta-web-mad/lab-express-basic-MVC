const express = require('express')
const path = require('path')

const app = express()

app.use(express.static('public'))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

// DB

require('./db/db-connection')

//Model

const Coaster = require('./models/coaster.model')

app.get('/', (req, res) => {
    res.render('index-page')
})

app.get('/coasters-gallery', (req, res) => {
    // res.render('coasters-gallery')
    Coaster
        .find()
        .sort({ title: 1 })
        .then((coasters) => res.render('coasters-gallery', { coasters }))
        .catch(err => console.log(err))

})
app.get('/longest-coaster', (req, res) => {

    Coaster
        .find({ length: { $gt: 100 } })
        .sort({ length: 1 })
        .then((coasters) => res.render('coasters-gallery', { coasters }))
        .catch(err => console.log(err))

})
app.get('/craziest-coaster', (req, res) => {

    Coaster
        .find({ inversions: { $gt: 3 } })
        .sort({ inversions: 1 })
        .then((coasters) => res.render('coasters-gallery', { coasters }))
        .catch(err => console.log(err))

})

app.listen(5005, () => console.log('APP LISTENING'))