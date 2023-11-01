const express = require('express')

const app = express()

const Coaster = require('./models/coaster.model')
require('./db/database-connection')

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')



app.get('/', (req, res) => {
    res.render('index')
})


app.get('/coasters-gallery', (req, res) => {
    Coaster
        .find()
        .sort({ title: 1 })
        .then(Coaster => res.render('Coaster-gallery-page', { coasters: Coaster }))
        .catch(err => console.log('ERROR', err))

})

app.get('/longest', (req, res) => {
    Coaster
        .find({ length: { $gt: 100 } })
        .then(Coaster => res.render('Coaster-gallery-page', { coasters: Coaster }))
        .catch(err => console.log('ERROR', err))
})

app.get('/craziest', (req, res) => {
    Coaster
        .find({ inversions: { $gt: 3 } })
        .then(Coaster => res.render('Coaster-gallery-page', { coasters: Coaster }))
        .catch(err => console.log('ERROR', err))
})




app.listen(5005, () => console.log('Server listening on port 5005'))
