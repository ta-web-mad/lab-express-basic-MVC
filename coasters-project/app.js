const express = require('express');

const hbs = require('hbs');

const app = express();

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

app.use(express.static('public'));

require('./db/database-connection')             // new: ddbb connection
const Coaster = require('./models/coaster.model')

app.get('/', (req, res) => {
    res.render('home-page');
});


app.get('/coasters', (req, res) => {

    Coaster

        .find()
        .sort({ title: 1 })
        .then(coasters => res.render('coasters-page', { coasters }))
        .catch(err => console.log("LA ESTÁS LIANDO", err))


});

app.get('/longest', (req, res) => {

    Coaster

        //He puesto 1000m en vez de 100m aposta xq 100 era muy poco.

        .find({ length: { $gt: 1000 } })
        .sort({ length: -1 })
        .then(coasters => res.render('longest-page', { coasters }))
        .catch(err => console.log("LA ESTÁS LIANDO", err))


});

app.get('/craziest', (req, res) => {

    Coaster


        .find({ inversions: { $gt: 3 } })
        .sort({ inversions: -1 })
        .then(coasters => res.render('craziest-page', { coasters }))
        .catch(err => console.log("LA ESTÁS LIANDO", err))


});




app.listen(5005, () => console.log('🏃‍ on port 5005'));