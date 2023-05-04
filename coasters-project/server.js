require('./db/database-connection')

const express = require('express')
const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

const Coaster = require('./models/coaster.model')


app.get("/", ( req,res ) => {
    res.render("index-page")
})

app.get("/coasters-gallery", (req, res)=>{


    Coaster
            .find()
            .sort({ title: 1 }) 
            .then(allCoasters =>  res.render("coasters", {coasters: allCoasters}))
            .catch(err => console.log(err))

})

app.get("/longest", (req, res)=>{
   // res.send("LONGEST")

    Coaster
            .find({ length: {$gt: 1000} })
            .then(allCoastersLongest =>  res.render("coasters-longest", {coastersLongest: allCoastersLongest}))
            .catch(err => console.log(err))
})

app.get("/craziest", (req, res)=>{
   // res.send("LONGEST")

    Coaster
            .find({ inversions: {$gt: 3} })
            .then(allCoastersCraziest =>  res.render("coasters-craziest", {coastersCraziest: allCoastersCraziest}))
            .catch(err => console.log(err))
})


app.listen(5005, () => console.log('SERVIDOR LEVANTADO EN 5005'))
