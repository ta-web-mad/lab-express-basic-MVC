const express = require('express')
const path = require('path')

const app = express()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))

require('./db/db-connection')

const coaster = require('./models/coaster.model')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/coasters-gallery', (req, res) => {
    coaster
        .find()
        .then(allCoasters => {
            res.render('coasters-gallery', { allCoasters })
        })
        .catch(err => console.log(err))
})


app.listen(5005, () => console.log('APP LISTENING'))