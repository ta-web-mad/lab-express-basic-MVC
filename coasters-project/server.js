require('./db/database-connection')

const Coaster = require('./models/coaster.model')
const express = require('express')

const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')


app.get('/', (req, res) => {
    res.render('home-page')
})

app.get('/coasters-gallery', (req, res) => {

    Coaster
        .find()
        .sort({ title: 1 })
        .then(coasters => res.render('coasters-gallery', { coasters }))
        .catch(err => console.log(err))
})




app.listen(5005, () => console.log('IS WORKING!'))