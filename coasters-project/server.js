// Happy coding! Party! 
const express = require("express")
const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

require("./db/db-connection")
const Coaster = require("./models/coaster.model")

//rooting 
app.get('/', (req, res) => {
    res.render('home')
})

app.get('/coasters-gallery', (req, res) => {
    Coaster
        .find()
        .sort({ title: 1 })
        .then(coasters => res.render('coasters-gallery', { coasters }))
        .catch(err => console.log("Se ha producido un error", err))
})

app.get('/longest', (req, res) => {
    Coaster
        .find({ length: { $gte: 100 } })
        .then(longCoasters => res.render('longest', { longCoasters }))
        .catch(err => console.log("Se ha producido un error", err))
})

app.get('/craziest', (req, res) => {
    Coaster
        .find({ inversions: { $gte: 3 } })
        .then(crazyCoasters => res.render('craziest', { crazyCoasters }))
        .catch(err => console.log("Se ha producido un error", err))
})

app.listen(5005, () => console.log("Server is listening on 5005"))