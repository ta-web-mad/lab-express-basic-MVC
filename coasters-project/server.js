const express = require('express')
const app = express()

//Settings
app.use(express.static('public'))
app.set("views", `${__dirname}/views`)
app.set("view engine", "hbs")


//DDBB Connection
require('./db/database-connection')

// model
const Coaster = require('./models/coaster.model')

//Routing 
app.get('/', (req, res) => {

    Coaster
        .findOne()
        .then(coasters =>
            res.render('index', { coasters })
        )
        .catch(err => console.log(err))
})

//Gallery
app.get('/coasters-gallery', (req, res) => {

    Coaster
        .find()
        .sort({ title: 1 })
        .then(coasters =>

            res.render('coasters-gallery', { coasters })
        )
        .catch(err => console.log(err))
})

//Longest Coasters (greater than 100)
app.get('/longest-coasters', (req, res) => {

    Coaster
        .find({ length: { $gt: 100 } })
        .sort({ title: 1 })
        .then(longestCoasters => {
            res.render('longest-coasters', { coasters: longestCoasters });
        })
        .catch(err => console.log(err));
})
//Craziest Coasters
app.get('/craziest-coasters', (req, res) => {

    Coaster
        .find({ inversions: { $gt: 3 } })
        .sort({ title: 1 })
        .then(craziestCoasters => {
            res.render('craziest-coasters', { coasters: craziestCoasters });
        })
        .catch(err => console.log(err));
})






app.listen(5005, () => console.log('server running in port 5005'))