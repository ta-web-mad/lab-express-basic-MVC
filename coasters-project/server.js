// Happy coding! Party! 

const express = require('express')

const app = express()

app.use(express.static('public'))
app.set("views", `${__dirname}/views`)
app.set("view engine", "hbs")

// db-connection
require('./db/db-connection')

// model
const Coaster = require('./models/coaster.model')

//endpoints here
app.get('/', (req, res) => {
    res.render('home-page')
})

app.get('/coaster-gallery', (req, res) => {
    Coaster
        .find()
        .then(coasters => res.render('coaster-gallery', { coasters }))
        .catch(error => console.log(error))
})
//endpoints up

app.listen(5005, () => console.log('Servidor corriendo en puerto 5005'))


