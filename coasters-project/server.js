// Happy coding! Party! 
const express = require("express")
const hbs = require("hbs")
const app = express()

app.set("view engine", 'hbs')
app.set('views', `${__dirname}/views`)
app.use(express.static('public'))

require('./db/database-connection')

const Coaster = require('./models/coaster.model')

app.get('/', (req, res) => {
    res.render('home-page')
})
app.get('/coasters-gallery', (req, res) => {

    Coaster
        .find()
        .sort({ title: 1 })
        .then(coasters => res.render('coasters-gallery', { coasters: coasters }))
        .catch(err => console.log('error mongolo', err))
})
app.get('/longest-coasters', (req, res) => {
    Coaster
        .find({ length: { $gt: 100 } })

        .then(coasters => res.render('longest-coasters', { coasters: coasters }))
        .catch(err => console.log('error mongolo', err))
})
app.get('/craziest-coasters', (req, res) => {
    Coaster
        .find({ inversions: { $gt: 3 } })

        .then(coasters => res.render('craziest-coasters', { coasters: coasters }))
        .catch(err => console.log('error mongolo', err))
})

app.listen(5005, () => console.log('running on port 5005'))