// Happy coding! Party! 

require('./db/database-connection')

const express = require('express')
const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

const Coaster = require('./models/coaster.model')

//route a la principal, esto es para probar que funciona
// app.get('/', (req, res) => {
//     res.send('Funciona')
// })

app.get('/', (req, res) => {
    res.render('home-page')
})

//route a coaster gallery esto es para probar que funciona

// app.get('/coasters-gallery', (req, res) => {
//     res.send('galleria')
// })

app.get('/coasters-gallery', (req, res) => {

    Coaster
        .find()
        .sort({ title: 1 })
        .then(allCoasters => res.render('coasters-gallery', { coasters: allCoasters }))
        .catch(err => console.log(err))
})

app.get('/longest', (req, res) => {
    Coaster
        .find({ length: { $gte: 1000 } })
        .then(allLongCoasters => {
            res.render("long-coasters", { longCoasters: allLongCoasters })
        })
        .catch(err => console.log(err))
})

app.get('/craziest', (req, res) => {
    Coaster
        .find({ inversions: { $gt: 3 } })
        .then(allCraziestCoasters => {
            res.render("crazy-coasters", { crazyCoasters: allCraziestCoasters })
        })
        .catch(err => console.log(err))
})



app.listen(5005, () => console.log('SERVIDOR LEVANTADO EN 5005'))
