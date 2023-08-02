const express = require('express')

const server = express()

server.use(express.static('public'))
server.set('views', `${__dirname}/views`)
server.set('view engine', 'hbs')

require('./db/database-connection')

const Coaster = require('./models/coaster.model')

server.get('/', (req, res) => {
    res.render('index')
})

server.get('/coasters-gallery', (req, res) => {
    Coaster
        .find()
        .sort({ title: 1 })
        .then((coasters) => {
            res.render('coasters-gallery', { coasters })
        })

})

server.get('/longest', (req, res) => {
    Coaster
        .find({ length: { $gt: 100 } })
        .then((coasters) => {
            res.render('coasters-gallery', { coasters })
        })
})


server.get('/craziest', (req, res) => {
    Coaster
        .find({ inversions: { $gt: 3 } })
        .then((coasters) => {
            res.render('coasters-gallery', { coasters })
        })
})

server.listen(5005, () => console.log('conectado al puerto 5005'))