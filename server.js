const express = require('express')
const hbs = require('hbs')
const path = require('path')

const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

hbs.registerPartials(path.join(__dirname, 'views/partials'))

//DDBB

require('./db/db-connection')

//Model

const Coaster = require('./models/coaster.model')


app.get('/', (req, res) => {
    res.render('index-coasters')
})

app.get('/coasters-gallery', (req, res) => {

    Coaster
        .find()
        .sort({ title: 1 })
        .then(allCoastersFromDB => {
            res.render('coasters-gallery', { allCoastersFromDB })
        })
        .catch(err => console.log(err))

})

app.get('/longest', (req, res) => {
    Coaster
        .find({ length: { $gt: 100 } })
        .sort({ length: 1 })
        .then(allCoastersFromDB => {
            res.render('longest', { allCoastersFromDB })
        })
        .catch(err => console.log(err))

})

app.get('/craziest', (req, res) => {
    Coaster
        .find({ inversions: { $gt: 3 } })
        .sort({ inversions: 1 })
        .then(allCoastersFromDB => {
            res.render('craziest', { allCoastersFromDB })
        })
        .catch(err => console.log(err))
})

app.listen(5005, () => console.log('Servidor levantado en puerto 5005'))
