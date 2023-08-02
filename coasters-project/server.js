const express = require('express')
const hbs = require('hbs')

const app = express()


app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

hbs.registerPartials(`${__dirname}/views/partials`)


require('./db/database-connection')

const Coaster = require('./models/coaster.model')

app.get('/', (req, res) => {
    res.render('index')

})

app.get('/coasters-gallery', (req, res) => {

    Coaster
        .find()
        .sort({ title: 1 })
        .then(roallercoasters => res.render('coasters-gallery', { roallercoasters }))
        .catch(err => console.log('Error', err))



})


app.get('/longest', (req, res) => {

    Coaster
        .find({ length: { $gt: 1000 } })
        .then(roallercoasters => res.render('longest', { roallercoasters }))
        .catch(err => console.log('Error', err))
})

app.get('/craziest', (req, res) => {

    Coaster
        .find({ inversions: { $gt: 3 } })
        .then(roallercoasters => res.render('craziest', { roallercoasters }))
        .catch(err => console.log('Error', err))

})


app.listen(5005, () => console.log('Escuchando en puerto 5005'))