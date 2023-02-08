const express = require('express')
const hbs = require('hbs')
const path = require('path')


const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')


const data = require('./db/db')

const Coaster = require('./models/coaster.model')



app.get('/', (req, res) => {
    res.render('index')
})


app.get('/coasters-gallery', (req, res) => {
    // res.send("hola")
    Coaster
        .find()
        .then(data => {
            res.render('coasters-gallery', { data })
        })
        .catch(err => console.log(err))

})



app.listen(5000, () => console.log('run on port 5000'))
