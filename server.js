// Happy coding! Party! 
require('./db/db-connection')

const express = require('express')
const app = express()



app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')


// const data = require('./coasters-data')

const Coaster = require('./models/coaster.model')

// Coaster.create(data)

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/coasters', (req, res) => {

    Coaster
        .find()
        .sort({ title: 1 })
        .then(allCoasters => res.render('coasters', { coastersObj: allCoasters }))
        .catch(error => console.log(error));
})


app.get('/longest', (req, res) => {

    Coaster
        .find({ length: { $gte: 1000 } })
        .sort({ length: -1 })
        .then(allCoasters => res.render('longest', { coastersObj: allCoasters }))
        .catch(error => console.log(error));
})

app.get('/craziest', (req, res) => {

    Coaster
        .find({ inversions: { $gte: 3 } })
        .sort({ inversions: -1 })
        .then(allCoasters => res.render('craziest', { coastersObj: allCoasters }))
        .catch(error => console.log(error));


    // res.render('coasters')

})

app.listen(5000, () => console.log('SERVIDOR LEVANTADO EN 5000'))
