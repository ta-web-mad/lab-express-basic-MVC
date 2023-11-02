const express = require("express")

const app = express()

app.use(express.static("public"))
app.set("views", `${__dirname}/views`)
app.set('view engine', 'hbs')

require("./db/database-conection")
const Coaster = require('./models/coaster.model')

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/coasters-gallery", (req, res) => {
    Coaster
        .find()
        .sort({ title: 1 })
        .then(allCoasters => res.render("coastersGallery", { coasters: allCoasters }))
        .catch(err => console.log('ERROR:', err))

})

app.get("/longest", (req, res) => {
    Coaster
        .find({ length: { $gte: 1000 } })
        .then(allLongestCoasters => res.render("longestCoasters", { longestCoasters: allLongestCoasters }))
        .catch(err => console.log('ERROR:', err))
})

app.get("/craziest", (req, res) => {
    Coaster
        .find({ inversions: { $gt: 3 } })
        .then(allCraziestCoasters => res.render("craziestCoasters", { craziestCoasters: allCraziestCoasters }))
        .catch(err => console.log('ERROR:', err))
})

// Coasters gallery page: under the / coasters - gallery endpoint, show a nice grid with 
// all the coasters including their info and image.


app.listen(5005, () => console.log('Server listening on port 5005'))
