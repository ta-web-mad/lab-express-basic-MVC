// Happy coding! Party! 
const express = require('express')
const hbs = require('hbs')
const path = require('path')

const app = express()

app.use(express.static('public'))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))


// DDBB
require('./db/db-connection')

// MODEL
const Coaster = require('./models/coaster.model')

// Register the location for handlebars partials here:
// hbs.registerPartials(`${__dirname}/views/partials`)

app.get('/', (req, res) => {
    Coaster
        .find()
        .select({ imageUrl: 1 })
        .then(allCoastersFromDB => {
            res.render('index-page', { coasters: allCoastersFromDB })
        })

})

app.get('/coasters-gallery', (req, res) => {
    Coaster
        .find()
        .sort({ title: 1 })
        .then(allCoastersFromDB => {
            res.render('coasters-gallery', { coasters: allCoastersFromDB })
        })
})

app.get('/longest', (req, res) => {
    Coaster
        .find({ length: { $gt: 1000 } })
        .sort({ length: -1 })
        .then(longestCoastersFromDB => {
            res.render('longest', { coasters: longestCoastersFromDB })
        })
})

app.listen(5005, () => console.log('Prueba'))