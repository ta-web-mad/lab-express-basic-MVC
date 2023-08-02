const express = require('express')

const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')


require('./db/database-connection')

const Coaster = require('./models/coaster.model')

app.get('/', (req, res) => {
    res.render('home-page')
})

app.get('/coaster-gallery', (req, res) => {
    Coaster
        .find()
        .sort({ title: 1 })
        .then(coasters => res.render('coaster-gallery', { coasters }))
        .catch(err => console.log('err'))
})

app.get('/longes-page', (req, res) => {
    Coaster
        .find({ length: { $gt: 100 } })
        .sort({ length: -1 })
        .then(coasters => res.render('longes-page', { coasters }))
        .catch(err => console.log('err'))
})
app.get('/craziest-page', (req, res) => {
    Coaster
        .find({ inversions: { $gt: 3 } })
        .sort({ inversions: -1 })
        .then(coasters => res.render('craziest-page', { coasters }))
        .catch(err => console.log('err'))
})


app.listen(5005, () => console.log('Server running on port 5005'))