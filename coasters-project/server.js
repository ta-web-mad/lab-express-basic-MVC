const express = require('express')
const hbs = require('hbs')

const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

hbs.registerPartials(`${__dirname}/views/partials`)

// Ddbb Connection
require('./db/database-connection')

// Model
const Coaster = require('./models/coaster.model')

// Routes
app.get('/', (req, res) => {
  res.render('home-page')
})

app.get('/coasters-gallery', (req, res) => {
  Coaster.find()
    .sort({ title: 1 })
    .then((coasters) => res.render('coasters-gallery-page', { coasters }))
    .catch((error) => console.log(error))
})

app.get('/longest', (req, res) => {
  Coaster.find({ length: { $gt: 1000 } })
    .sort({ title: 1 })
    .then((coasters) => res.render('longest-page', { coasters }))
    .catch((error) => console.log(error))
})

app.get('/craziest', (req, res) => {
  Coaster.find({ inversions: { $gt: 3 } })
    .sort({ title: 1 })
    .then((coasters) => res.render('craziest-page', { coasters }))
    .catch((error) => console.log(error))
})

app.listen(5005, () => console.log('Server running on port 5005'))
