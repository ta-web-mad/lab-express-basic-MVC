const express = require('express')
const hbs = require('hbs')

const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')


hbs.registerPartials(`${__dirname}/views/partials`)

// ddbb connection
require('./db/database-connection')


const Coaster = require('./models/coaster.model')


app.get('/', (req, res) => {
    res.render('index-page')
})


app.get('/gallery', (req, res) => {

    Coaster
    .find()
    .sort({title: 1})
    .then(coasters => res.render('coasters-gallery', { coast : coasters }))
    .catch(err => console.log(err))
})

app.get('/longest', (req, res) => {

    Coaster
        .find({length: {$gt :100}})
        .then(coasters => res.render('coasters-gallery', { coast: coasters }))
        .catch(err => console.log(err))
})

app.get('/craziest', (req, res) => {

    Coaster
        .find({ inversions: { $gt: 3 } })
        .then(coasters => res.render('coasters-gallery', { coast: coasters }))
        .catch(err => console.log(err))
})

app.listen(5005, () => console.log('Server running on port 5005'))



