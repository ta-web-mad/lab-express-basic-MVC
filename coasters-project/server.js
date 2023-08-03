// Happy coding! Party! 
const express = require('express')

const hbs = require('hbs')

const Coaster = require('./models/coaster.model')

const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

hbs.registerPartials(`${__dirname}/views/partials`)

//conexión a la base de datos
require('./db/database-connection')

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/coasters-gallery', (req, res) => {

    Coaster
        .find()
        .sort({ title: 1 })
        .then(coaster => res.render('coasters-gallery', { coaster }))
        .catch(err => console.log(err))

});

app.get('/longest', (req, res) => {
    Coaster
        .find({ length: { $gt: 100 } })
        .then(coaster => res.render('coasters-gallery', { coaster }))
        .catch(err => console.log(err))
})

app.get('/craziest', (req, res) => {
    Coaster
        .find({ inversions: { $gt: 3 } })
        .then(coaster => res.render('coasters-gallery', { coaster }))
        .catch(err => console.log(err))
})



app.listen(5005, () => console.log('Server running on port 5005'))