// Happy coding! Party! 
const express = require('express')
const path = require('path')

const app = express()

app.use(express.static('public'))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

// DDBB
require('./db/db-connection')

// Model
const Coaster = require('./models/coaster.model')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/coasters-gallery', (req, res) => {
    Coaster
        .find()
        .then(coasters => {
            res.render('coasters-gallery', { coasters: coasters })
        })
        .catch(err => console.log(err))
})

app.get('/coaster-longest', (req, res) => {
    Coaster
        .find({length: {$gt: 1000} })
        .then(coasters => {
            res.render('coaster-longest', { coasters: coasters })
        })
        .catch(err => console.log(err))
})

app.get('/coaster-craziest', (req, res) => {
    Coaster
        .find({inversions: {$gt: 3} })
        .then(coasters => {
            res.render('coaster-craziest', { coasters: coasters })
        })
        .catch(err => console.log(err))
})

app.listen(5005, () => console.log('APP LISTENING'))