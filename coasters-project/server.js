// Happy coding! Party! 
require('./db/database-connection')

const express = require('express')
const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

const Coaster = require('./models/coaster.model')

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/coasters-gallery', (req, res) => {

    Coaster
        .find()
        .sort({ title: 1 })
        .then(coasters => {
            res.render('coasters-gallery', { coasters }) //--> "isActive will allow bootstrap navbar class to be highlighted when used is on this page"
        })
        .catch(err => console.log('--> not connex', err))

})

app.get('/longest', (req, res) => {
    Coaster
        .find({ length: { $gt: 100 } })
        .sort({ length: -1 })
        .then(coasters => {
            res.render('longest', { coasters })
        })
        .catch(err => console.log('--> not connex', err))
})

app.get('/craziest', (req, res) => {
    Coaster
        .find({ inversions: { $gt: 3 } })
        .sort({ inversions: -1 })
        .then(coasters => {
            res.render('craziest', { coasters })
        })
        .catch(err => console.log('--> not connex', err))
})

app.listen(5005, () => console.log('SERVER UP AT 5005'))