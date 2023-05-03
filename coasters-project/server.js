// Happy coding! Party! 
require('./db/data-base-connection')
const hbs = require('hbs')
const express = require('express')
const app = express()

//Model Schema
const Coaster = require('./models/coaster.model')
//Config
app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')
//partials
hbs.registerPartials(__dirname + "/views/partials")
//------PAGES------
//HOME
app.get("/", (req, res) => {
    res.render("home")
})
//Coaster galery
app.get("/coasters-galery", (req, res) => {
    Coaster
        .find()
        .sort({ title: 1 })
        .then(coaster => res.render("coasters-galery", { coasters: coaster }))
})
//longest
app.get("/longest", (req, res) => {
    Coaster
        .find({ length: { $gt: 100 } })
        .then(coaster => res.render("longest", { coasters: coaster }))
})
//craziest
app.get("/craziest", (req, res) => {
    Coaster
        .find({ inversions: { $gt: 3 } })
        .then(coaster => res.render("craziest", { coasters: coaster }))
})
//Server
app.listen(5005, () => console.log("Servidor levantado"))