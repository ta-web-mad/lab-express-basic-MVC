const mongoose = require('mongoose')
const data = require('./coasters-data.json')
const express = require('express')

const MONGODB_URI = 'mongodb://127.0.0.1:27017/coasters-app';
const Coaster = require('./models/coaster.model');

const hbs = require('hbs');
const path = require('path');

const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));


require('./db/database-connection')

app.listen(3000, () => console.log('🏃‍ on port 3000'));


app.get('/', (req, res) => {
    res.render('home-page')
})

app.get('/coasters-gallery', (req, res) => {
    Coaster
        .find()
        .sort({ title: 1 })
        .then(coasters => res.render('coasters-gallery', { coasters }))
        .catch(error => console.log(error))
})


app.get('/longest-coaster', (req, res) => {
    Coaster
        .find({ length: { $gt: 100 } })
        .sort({ title: 1 })
        .then(coasters => res.render('longest-coaster', { coasters }))
        .catch(error => console.log(error))
})
app.get('/craziest-coaster', (req, res) => {
    Coaster
        .find({ inversion: { $gt: 3 } })
        .then(coasters => res.render('craziest-coaster', { coasters }))
        .catch(error => console.log(error))
})

