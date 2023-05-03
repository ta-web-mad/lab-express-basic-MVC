// Happy coding! Party! 
require('./db/database-conenction')

const express = require('express')
const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

const Coaster = require('./models/coaster.model')


app.get('/', (req, res) => {
    res.render('index-page')
})


app.get('/coasters-gallery', (req, res) => {

    Coaster
        .find()
        .sort({ title : 1})
        .then(allCoasters => {
            res.render('coasters-gallery', {coasters: allCoasters})
        })
        .catch(err => console.log(err))
})


app.get('/longest', (req, res) => {

    Coaster
        .find({ length: { $gt: 100 } })
        .sort({ length : -1 })
        .then(allCoasters => {
            res.render('longest-page', {coasters: allCoasters})
        })
        .catch(err => console.log(err))
})


app.get('/craziest', (req, res) => {

    Coaster
        .find({ inversions : { $gt: 3 } })
        .sort({ inversions : -1 })
        .then(allCoasters => {
            res.render('craziest-page', {coasters: allCoasters})
        })
        .catch(err => console.log(err))
})


app.listen(5005, () => console.log('SERVIDOR LEVANTADO EN 5005'))