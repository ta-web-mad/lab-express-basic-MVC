// Setup
const express = require('express')

const hbs = require('hbs')
const path = require('path')
const server = express()

server.set('view engine', 'hbs')
server.set('views', path.join(__dirname, 'views'))

server.use(express.static(path.join(__dirname, 'public')))

const PORT = 5005

// Databases
const mongoose = require('./db/db-connection')

// Models
const Coaster = require('./bin/coasters.model.js')

// Partials
hbs.registerPartials(`${__dirname}/views/partials`)

// Routes
server.get('/', (req, res) => {
    res.render('index')
})

server.get('/coasters-gallery', (req, res) => {
    Coaster
        .find()
        .sort({ title: 1 })
        .then(themepark => {
            res.render('coasters-gallery', { themepark })
        })
        .catch(error => console.log('Coasters gallery error:', error))
})

server.get('/longest', (req, res) => {
    Coaster
        .find({ length: { $gt: 1000 } })
        .sort({ length: 1 })
        .then(themepark => {
            res.render('coasters-gallery', { themepark })
        })
        .catch(error => console.log(error))
})

server.get('/craziest', (req, res) => {
    Coaster
        .find({ inversions: { $gt: 5 } })
        .sort({ inversions: 1 })
        .then(themepark => {
            res.render('coasters-gallery', { themepark })
        })
        .catch(error => console.log(error))
})

server.get('/coasters-gallery/:coasterId', (req, res) => {
    const pathId = req.params.coasterId
    console.log({ pathId })
    Coaster
        .findById(pathId)
        .then(themepark => {
            console.log(themepark)
            res.render('pathId', { themepark })
        })
        .catch(error => console.log('Coasters gallery error:', error))
})

// Routing
server.listen(PORT, () => console.log('Server running‍ on port 5005'))