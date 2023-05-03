require('./db/database-conection')
//console.log("te estas conectando??")

const express = require('express')
const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

const Coaster = require('./models/coaster.model')


//routing pruebas
// app.get('/', (req, res) => {
//     res.send('prueba página principal')
// })

// app.get('/coasters-gallery', (req, res) => {
//     res.send('prueba pagina gallery')
// })

app.get('/', (req, res) => {
    res.render('index-page')
})


app.get('/coasters-gallery', (req, res) => {

    Coaster
        .find()
        .sort({ title: 1 })
        .then(allCoasters => {
            res.render('gallery-page', { coasters: allCoasters })
        })
        .catch(err => console.log(err))
})


app.get('/longest', (req, res) => {
    res.render('longest-page')
})

app.get('/craziest', (req, res) => {
    res.render('craziest-page')
})
app.listen(5005, () => console.log('SERVIDOR LEVANTADO EN 5005'))