// Happy coding! Party! 

const express = require('express')

const hbs = require('hbs')

const path = require('path')

const app = express()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

require('./db/db-connection')

const Coaster = require('./models/coaster.model')


app.get('/', (req, res) => {
    res.render('index')
})

app.get('/coaster-gallery', (req, res) => {
    Coaster
        .find()
        .then(allCoasters => {
            res.render('coaster-gallery', { allCoasters })
            console.log(allCoasters)

        })


})



app.listen(5005, () => console.log('🏃‍ on port 5005'));


