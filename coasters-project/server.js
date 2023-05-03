require('./db/database-connection')

const express = require('express')
const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

const Coaster = require('./models/coaster.model.js')

///Home/////
app.get('/', (req, res) => {
    res.render('home')
})


//// All Coasters sorted Alpbht////
app.get('/coasters', (req, res) => {
    Coaster
        .find()
        .sort({ title: 'asc' })
        .then(allCoasters => res.render('coasters', { coaster: allCoasters }))
        .catch(err => console.log(err))
})
////sorted longest///
app.get('/longest', (req, res) => {
    Coaster
        .find({ length: { $gte: 100 } })
        .sort({ length: 'asc' })
        .then(allCoasters => res.render('longest', { coaster: allCoasters }))
        .catch(err => console.log(err))
})
////sorted inversors///

app.get('/craziest', (req, res) => {
    Coaster
        .find({ inversions: { $gt: 3 } })
        .sort({ length: 'asc' })
        .then(allCoasters => res.render('craziest', { coaster: allCoasters }))
        .catch(err => console.log(err))
})



app.listen(5005, () => console.log('SERVIDOR LEVANTADO EN 5005'))