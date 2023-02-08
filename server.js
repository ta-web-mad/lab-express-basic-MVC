const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(`${__dirname}/views/partials`)

require('./db/db-connection');
const Coaster = require('./models/coaster.model')

app.get('/', (req, res) => {
    Coaster
        .aggregate([
            { $sample: { size: 1 } }
        ])
        .then(coasters => {
            res.render('index', { coaster: coasters[0].imageUrl });
        })
        .catch(err => console.log(err))
});
app.get('/coasters-gallery', (req, res) => {
    Coaster
        .find()
        .sort({ title: 1 })
        .then(coasters => {
            res.render('coasters-gallery', { coasters });
        })
        .catch(err => console.log(err))
});
app.get('/longest', (req, res) => {
    Coaster
        .find({ length: { $gt: 100 } })
        .then(coasters => {
            res.render('longest', { coasters });
        })
        .catch(err => console.log(err))
});
app.get('/craziest', (req, res) => {
    Coaster
        .find({ inversions: { $gt: 3 } })
        .then(coasters => {
            res.render('craziest', { coasters });
        })
        .catch(err => console.log(err))
});


app.listen(5005, () => console.log("Server started in port 5005"))