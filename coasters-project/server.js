const express = require('express')

const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

require('./db/database-connection')
const Coaster = require('./models/coaster.model') 

app.get('/', (req, res) => {
    res.render('home-page')
})

app.get('/coasters-gallery', (req, res) => {
    Coaster
        .find()
        .sort({ title: 1 })
        .then(coasters => {
            res.render('coasters-gallery', { coasters: coasters})
        })
        .catch(err => console.log('ERROR:', err))
})

app.get('/longest-coasters', (req, res) => {
    Coaster
        .find({ length: { $gt: 100 } })
        .sort({ title: 1 })
        .then(longestCoasters => {
            res.render('longest-coasters', { coasters: longestCoasters})
        })
        .catch(err => console.log('ERROR:', err))
})

app.get('/craziest-coasters', (req, res) => {
    Coaster
        .find({ inversions: { $gt: 3 } })
        .sort({ title: 1 })
        .then(craziestCoasters => {
            res.render('craziest-coasters', { coasters: craziestCoasters})
        })
        .catch(err => console.log('ERROR:', err))
})

app.get('/coasters/:id', (req, res) => {
    Coaster
        .findById(req.params.id)
        .then(responseFromAPI => {
            console.log(responseFromAPI)
            res.render('coaster-detail', responseFromAPI)
        })
        .catch(err => console.log('ERROR:', err))
  })

app.listen(5005, () => console.log('Server listening on port 5005'))