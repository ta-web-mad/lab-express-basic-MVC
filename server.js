
const express = require('express')

const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

require('./db/database-connection')

const Coaster = require('./models/coaster.models')
const { short } = require('webidl-conversions')

//routes
app.get('/', (req, res) => {

    res.render('index');
});

app.get('/coasters-galery', (req, res) => {
    Coaster
        .find()
        .sort({ title: 1 })
        .then(eachCoaster => res.render('coasters-galery', { eachCoaster }))
        .catch(error => console.log(error));

});

app.get('/longest', (req, res) => {
    Coaster
        .find({ length: { $gt: 100 } })

        .then(eachCoaster => res.render('coasters-galery', { eachCoaster }))
        .catch(error => console.log(error));

});
app.get('/craziest', (req, res) => {
    Coaster
        .find({ inversions: { $gt: 3 } })

        .then(eachCoaster => res.render('coasters-galery', { eachCoaster }))
        .catch(error => console.log(error));

});

app.listen(5005, () => console.log('server running on part 5005'))