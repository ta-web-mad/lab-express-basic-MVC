// Happy coding! Party! 
const express = require('express')
const Coaster = require('./models/coaster.model.js')
const { title } = require('process')

const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

require('./db/database-connection.js')

require('./models/coaster.model.js')

app.get('/', (req, res) => {
    res.render('home-page')
})

app.get('/coaster-gallery', (req, res) => {
    Coaster
        .find()
        .sort({ title: 1 })
        .then(coasters => {
            res.render('coaster-gallery', { coasters: coasters })
        })
        .catch(err => console.error("Ha habido un error", err))

})

app.get('/longest-coaster', (req, res) => {
    Coaster
        .find()
        .sort({ length: -1 })
        .limit(1)
        .then(coasters => {
            res.render('longest-coaster', { coasters: coasters })
        })
        .catch(err => console.error("Ha habido un error", err))
})

app.get('/craziest-coaster', (req, res) => {
    Coaster
        .find({ inversions: { $gte: 3 } })
        .then(coasters => {
            res.render('craziest-coaster', { coasters: coasters })
        })
        .catch(err => console.error("Ha habido un error", err))
})

app.listen(5005, () => console.log("Se ha ejecutado"))