const express = require("express")

const server = express()

server.use(express.static('public'))
server.set('views', `${__dirname}/views`)
server.set('view engine', 'hbs')

require('./db/database-connection')

const Coaster = require("./models/coaster.models")

server.get("/", (req, res) => {
    res.render("home-page")
})

server.get("/coasters", (req, res) => {
    Coaster
        .find()
        .sort({ title: 1 })
        .then(allCoasters => {
            res.render("coasters", { allCoasters })
        })
        .catch(err => console.log("ERROR", err))


})

server.get("/longest", (req, res) => {
    Coaster
        .find({ length: { $gt: 100 } })
        .then(longestCoasters => {
            res.render("longest-coasters", { longestCoasters })
        })
        .catch(err => console.log("ERROR", err))
})
server.get("/craziest", (req, res) => {
    Coaster
        .find({ inversions: { $gt: 3 } })
        .then(craziestCoasters => {
            res.render("craziest-coasters", { craziestCoasters })
        })
        .catch(err => console.log("ERROR", err))
})

server.listen(5005, () => console.log('Server listening on port 5005'))