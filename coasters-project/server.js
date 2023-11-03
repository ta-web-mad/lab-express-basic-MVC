const express = require('express')
const mongoose = require('./db/database-connection')
const app = express()
const hbs = require('hbs')

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

const coaster = require('./models/coaster.model')

app.get('/', (req, res) => {
    res.render('home-page')
})

// app.get('/beers', (req, res) => {
//     // res.render('beers');

//     punkAPI
//         .getBeers()
//         .then(beersFromApi => res.render('beers', { beers: beersFromApi }))
//     // .catch(error => console.log(error));

// });



app.listen(5005, () => console.log('✅ Server working on port 5005'))