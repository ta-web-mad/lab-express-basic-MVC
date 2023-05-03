require('./db/database-connection')

const express = require('express')
const app = express()


app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

const Coaster = require('./models/coaster.model')



//index page
app.get('/', (req, res) => {
    res.render('index-page')
})

//coasters pages
app.get('/coasters-page', (req, res) => {
    Coaster
        .find().sort({ title: 1 })
        .then(allCoasters => res.render('coasters-page', { coasters: allCoasters }))
        .catch(err => console.log(err))
})

//longest pages
app.get('/longest-page', (req, res) => {
    Coaster
        .find({ length: { $gte: 1000 } })
        .then(allCoasters => res.render('longest-page', { coasters: allCoasters }))
        .catch(err => console.log(err))
})

//craziest pages
app.get('/craziest-page', (req, res) => {
    Coaster
        .find({ inversions: { $gte: 3 } })
        .then(allCoasters => res.render('craziest-page', { coasters: allCoasters }))
        .catch(err => console.log(err))
})


// Server
app.listen(5005, () => console.log('SERVIDOR LEVANTADO EN 5005'))
