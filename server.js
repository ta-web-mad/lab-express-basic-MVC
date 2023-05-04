
require('./db/db-connection')

const express = require('express')
const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

const data = require('./coasters-data.json');
// console.log(data)

const Coaster = require('./models/coaster.model')

Coaster.deleteMany()
    .then(console.log('Se han eliminado la bd'))
    // .then(Coaster.create(data))
//     .then(console.log("base de datos creada con data.json"))
    .catch(err => console.log('Se produjo un error', err)) 

Coaster.insertMany(data)
    .then(console.log("base de datos creada con data.json"))
    .catch(err => console.log("ERROR:" , err))


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/coasters', (req, res) => {
    Coaster
    .find().sort( {name:1} )
    .then(arrayCoasters => res.render('coasters' , {coaster: arrayCoasters}))
    .catch(err => console.log("ERROR:" , err))

})

app.get('/longest', (req, res) => {
    Coaster.find({length: {$gte: 1000}})
    .then(arrayCoasters => res.render('longest' , {coaster: arrayCoasters}))
    .catch(err => console.log("ERROR:" , err))

})

app.get('/craziest', (req, res) => {
    Coaster.find({inversions: {$gt: 3}})
    .then(arrayCoasters => res.render('craziest' , {coaster: arrayCoasters}))
    .catch(err => console.log("ERROR:" , err))
})


app.listen(3000, () => console.log('SERVIDOR LEVANTADO EN 3000'))