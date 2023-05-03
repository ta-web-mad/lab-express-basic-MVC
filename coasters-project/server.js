// Happy coding! Party! 
const express = require('express')
const hbs = require('hbs');
const path = require('path');
const { default: mongoose } = require('mongoose')

const app = express();

app.use(express.static('public'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


require('../coasters-project/db/0_ddbb-connection')
const Coaster = require('../coasters-project/models/coaster.model')

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/coasters-gallery', (req, res) => {
    Coaster
        .find()
        .sort({ title: 1 })
        .then(coaster => {
            res.render('coasters-gallery', { coaster })
        })
        .catch(err => console.log(err))
});
app.get('/longest', (req, res) => {
    Coaster
        .find({ length: { $gt: 100 } })
        .sort({ title: 1 })
        .then(coaster => {
            res.render('longest', { coaster })
        })
        .catch(err => console.log(err))
});
app.get('/craziest', (req, res) => {
    Coaster
        .find({ inversions: { $gt: 3 } })
        .sort({ title: 1 })
        .then(coaster => {
            console.log(coaster)
            res.render('craziest', { coaster })
        })
        .catch(err => console.log(err))
});

app.listen(5005, () => console.log('‍Servidor on port 5005'));


