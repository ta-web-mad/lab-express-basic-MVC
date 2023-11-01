// Happy coding! Party! 
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

app.get('/coasters-gallery', (req, res) => {
    Coaster                                         // new: local ddbb transaction
        .find()
        .sort({ title: 1 })
        .then(coasters => {
            res.render('coasters-page', { po: coasters })
        })
        .catch(err => console.log('ERROR:', err))
})

app.get('/longest', (req, res) => {
    Coaster                                         // new: local ddbb transaction
        .find({ length: { $gt: 100 } })
        .sort({ length: 1 })
        .then(coasters => {
            res.render('coasters-page', { po: coasters })
        })
        .catch(err => console.log('ERROR:', err))
})

app.get('/craziest', (req, res) => {
    Coaster                                         // new: local ddbb transaction
        .find({ inversions: { $gt: 3 } })
        .sort({ inversions: 1 })
        .then(coasters => {
            res.render('coasters-page', { po: coasters })
        })
        .catch(err => console.log('ERROR:', err))
})



app.listen(5005, () => console.log('Server listening on port 5005'))