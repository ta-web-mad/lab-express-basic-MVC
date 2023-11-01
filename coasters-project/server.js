const express = require('express')

const server = express()

server.use(express.static('public'))
server.set('views', `${__dirname}/views`)
server.set('view engine', 'hbs')


require('./db/database-connection')
const Coaster = require('./models/coaster.model')

server.get('/', (req, res) => {
    res.render('home')
}),

    server.get('/coasters-gallery', (req, res) => {
        Coaster
            .find()
            .then(coaster => res.render('coasters-gallery', { coaster: coaster }))
            .catch(err => console.log('ERROR:', err))

    })





server.listen(3000, () => console.log('estoy preparado'))




