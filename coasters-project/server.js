const express = require('express')

const app = express()


app.use(express.static('public'))
app.set("views", `${__dirname}/views`)
app.set("view engine", "hbs")

require('./bd/databse-connection')

const Coaster = require('./models/coaster.model')


app.get("/", (req, res) => {

    res.render("index-page")
})

app.get("/coasters-gallery", (req, res) => {

    Coaster
        .find()
        .then(coasters => res.render('coasters-gallery', { coasters }))
        .catch(err => console.log(err))
})

app.listen(5005, () => console.log('RUNNING ON PORT 5005'))
