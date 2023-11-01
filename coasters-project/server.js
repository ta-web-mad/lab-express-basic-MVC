// Happy coding! Party! 
const express = require('express')

const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')


require('./db/database-connection')
const Coaster = require('./models/coaster.model')


//routing
app.get('/', (req, res) => {
    res.render('home-page')
})

app.get('/coasters-gallery', (req, res) => {

    Coaster
        .find()
        .sort({ length: -1, title: 1 })
        .then(allCoasters => {
            // console.log(allCoasters)
            res.render('coasters', { allCoasters })

        })
        .catch(error => console.log('ERRORSITO'))

})

app.get('/longest', (req, res) => {
    Coaster
        .find({ length: { $gt: 100 } })
        .then(allCoasters => {
            res.render('longest', { allCoasters })
        })
})

app.get('/craziest', (req, res) => {
    Coaster
        .find({ inversions: { $gt: 3 } })
        .then(allCoasters => {
            res.render('craziest', { allCoasters })
        })
})

app.listen(5005, () => console.log('Server listening on port 5005'))