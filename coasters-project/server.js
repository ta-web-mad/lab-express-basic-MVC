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

app.get('/', (req, res) => {
    res.render('coasters-gallery')
})

app.get('/coasters-gallery', (req, res) => {

    Coaster
        .find()
        .sort({ title: 1 })
        .then(coasters => res.render('coasters-gallery', { coasters }))
        .catch(err => console.log('ERROR:', err))

})
app.get('/longest', (req, res) => {
    Coaster
        .find({ length: { $gte: 100 } })
        .sort({ length: 1 })
        .then(coasters => res.render('longest', { coasters }))
        .catch(err => console.log('ERROR:', err))


})

app.get('/craziest', (req, res) => {
    Coaster
        .find({ inversions: { $gte: 3 } })
        .sort({ inversions: 1 })
        .then(coasters => res.render('longest', { coasters }))
        .catch(err => console.log('ERROR:', err))


})







app.listen(5005, () => console.log('Server listening on port 5005'))