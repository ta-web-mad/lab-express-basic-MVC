// Happy coding! Party! 
const express = require('express')

const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')


require('./db/database-connection')
const coaster = require('./models/coaster.model')
const Coaster = require('./models/coaster.model')

app.get('/', (req,res) =>{
    res.render('home-page')
})

app.get('/gallery', (req, res)=>{
    
    Coaster
        .find()
        .then(coaster => res.render('coasters-gallery', {coasters}))
        .catch(err => console.log('ERROR:', err)) 
})

app.get('/longest', (req, res)=>{
    Coaster
        .find({ length: { $gte: 1000 } })
        .then(allLongCoasters => {
            res.render("long-coasters", { longCoasters: allLongCoasters })
        })
        .catch(err => console.log(err))
    })

app.get('/craziest', (req, res)=>{
    Coaster
        .find({inversions: {$gt: 3}})
        .then(allCraziesntCoasters => {
            res.render("crazy-coasters", {crazyCoasters}) 
        })
        .catch(err => console.log(err))

})

app.listen(5005, () => console.log('SERVIDOR LEVANTADO EN 5005'))