const express = require('express')
const hbs = require('hbs')
const { default: mongoose } = require('mongoose')
const path = require('path')


// const databaseName = 'themepark'
// const connectionString = `mongodb://localhost/${databaseName}`

const app = express()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

hbs.registerPartials(`${__dirname}/views/partials`)

require('./db/ddbb-connection')

const Coaster = require('./models/coaster.model')



app.get('/', (req, res) => {
    res.render('index')
})

app.get('/coasters-gallery-page', (req, res) => {

    Coaster
        .find()
        .sort({ title: 1 })
        .then(coaster => {
            res.render('coasters-gallery-page', { coaster })
        })
        .catch(error => console.log(error))

})

app.get('/craziest', (req, res) => {

    Coaster
        .find({ inversions: { $gt: 3 } })

        .then(crazy => {
            res.render('craziest', { crazy })
        })
        .catch(error => console.log(error))

})

app.get('/longest', (req, res) => {

    Coaster
        .find({ length: { $gt: 100 } })

        .then(longest => {
            res.render('longest', { longest })
        })
        .catch(error => console.log(error))

}

)

app.listen(3000, () => console.log('FUNCIONAA'));