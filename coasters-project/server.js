
//requerir express
const express = require('express')
const path = require('path')
//instanciar express
const app = express()


const hbs = require('hbs')

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'Public')))


require('./db/db-connection')



const Coaster = require('./models/coaster.model')


//rutas

app.get('/', (req, res) => {

    res.render('index-page')
})

app.get('/coasters-gallery', (req, res) => {
    Coaster
        .find()
        .then(allCoasters => {
            res.render('coasters-gallery', { allCoasters })

        })
        .catch(err => console.log(err))
})


app.listen(5005, () => console.log('servidor levantado'))