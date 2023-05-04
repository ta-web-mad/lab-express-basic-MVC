// Happy coding! Party! 
require('./db/database-connection')

const express = require('express')
const app = express()

let Coaster = require('./models/coaster.model')

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/coaster-gallery', (req,res)=> {
    Coaster
        .find()
        .sort({title: 1})
        .then(allCoasters => {res.render('coaster-gallery', { coasters: allCoasters})})
        .catch(err => console.log("Soy el catch de coaster gallery",err))
})
app.get('/longest', (req,res)=> {
    Coaster
        .find({length: {$gt: 1000}})
        .sort({title: 1})
        .then(longestCoasters => {res.render('longest', { longestCoasters: longestCoasters})})
        .catch(err => console.log("Soy el catch de coaster gallery",err))
})
app.get('/craziest', (req, res)=> {
    Coaster
        .find({inversions: {$gt: 3}})
        .sort({title: 1})
        .then(craziestCoasters => {res.render('craziest', { craziestCoasters: craziestCoasters})})
        .catch(err => console.log("Soy el catch de coaster gallery",err))
})



app.listen(5005)
