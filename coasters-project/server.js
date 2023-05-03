const express = require('express');
const server = express()
const hbs = require('hbs');
const path = require('path')



server.set('view engine', 'hbs');
server.set('views', path.join(__dirname, 'views'));

server.use(express.static(path.join(__dirname, 'public')));

// DDBB
require('./db/db-connection')

// Model
const Coasters = require('./models/coaster.model')



server.get('/', (req, res) => {
    res.render('index');
});


server.get('/coastersGallery', (req, res) => {
    console.log('entro aqui?')

    Coasters
        .find()
        .then(coasters => {
            res.render('coastersGallery', { coasters })
        })
        .catch(err => console.log(err))
})

server.get('/longestCoasters', (req, res) => {

    Coasters

        .find({ length: { $gte: 100 } })
        .sort({ length: 1 })
        .then(coasters => {
            res.render('longestCoasters', { coasters })
        })
        .catch(err => console.log(err))

})

server.get('/craziestCoasters', (req, res) => {

    Coasters

        .find({ inversions: { $gt: 3 } })
        .sort({ inversions: 1 })
        .then(coasters => {
            res.render('craziestCoasters', { coasters })
        })
        .catch(err => console.log(err))
})

server.listen(5005, () => console.log('APP LISTENING'))