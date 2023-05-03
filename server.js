require('./db/database-connection')

const express = require('express')
const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')


const Coaster = require('./models/coaster.model')


app.get('/', (req, res) => {
    res.render("index_page")
})
app.get('/coasters', (req, res) => {
    Coaster
        .find()
        .sort({ title: 1 })
        .then(theRoads => {
            res.render("coasters", { coasters: theRoads })
        })
        .catch(error => console.log(error));
});
app.get('/longest', (req, res) => {
    Coaster
        .find({ length: { $gt: 100 } })
        .sort({ length: -1 })
        .limit(6)
        .then(theRoads => {
            res.render("longest", { coasters: theRoads })
        })
        .catch(error => console.log(error));
})
app.get('/craziest', (req, res) => {
    Coaster
        .find({ inversions: { $gt: 3 } })
        .sort({ inversions: -1 })
        .limit(6)
        .then(theRoads => {
            res.render("craziest", { coasters: theRoads })
        })
        .catch(error => console.log(error));
})

app.get('/help', (req, res) => {
    res.render("help")
})



app.listen(5005, () => console.log('SERVIDOR LEVANTADO EN 5005'))