const express = require("express")
const server = express()

require('./db/database-connection')
server.use(express.static('public'))
server.set('view engine', 'hbs')
server.set('views', `${__dirname}/views`)

const Coaster = require('./models/coaster.model')

server.get("/", (req, res) => {
    res.render("homepage")
})



server.get("/coasters-gallery", (req, res) => {
    Coaster
        .find()
        .sort({ title: 1 })
        .then(coaster => {
            res.render("coasters-gallery", { pepino: coaster })


        })
        .catch(err => console.log('ERROR:', err))


})




server.get("/longest", (req, res) => {
    Coaster
        .find(({ length: { $gte: 100 } }))
        .sort({ length: -1 })
        .then(coaster => {
            res.render("longest", { longest: coaster })


        })
        .catch(err => console.log('ERROR:', err))


})




server.get("/craziest", (req, res) => {
    Coaster
        .find(({ inversions: { $gte: 3 } }))
        .sort({ inversions: -1 })
        .then(coaster => {
            res.render("craziest", { crazy: coaster })


        })
        .catch(err => console.log('ERROR:', err))


})




server.listen(5005, () => console.log('Server listening on port 5005'))