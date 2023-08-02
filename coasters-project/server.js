// Happy coding! Party! 
const express = require('express')

const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

//db conection
require('./db/database-connection')

//runing on port
app.listen(5005, () => console.log('Server running on port 5005'))

//model

const Coaster = require('./models/coaster.model')

//routin boton pagina inicio
app.get('/', (req, res) => {
    res.render('index-page')
})

app.get('/coaster-gallery', (req, res) => {

    Coaster
        .find()
        .then(coasters => res.render('coaster-gallery', { coasters }))
        .catch(err => console.log(err))
})


app.get('/longest', (req, res) => {
    Coaster
        .find({ length: { $gt: 100 } })
        .then(coasters => res.render('coaster-gallery', { coasters }))
        .catch(err => console.log(err))
})

app.get('/craziest', (req, res) => {
    Coaster
        .find({ inversions: { $gt: 3 } })
        .then(coasters => res.render('coaster-gallery', { coasters }))
        .catch(err => console.log(err))
})