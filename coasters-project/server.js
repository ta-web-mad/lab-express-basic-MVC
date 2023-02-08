// Happy coding! Party! 

const express = require('express')
const hbs = require('hbs')
const path = require('path')

const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

hbs.registerPartials(path.join(__dirname, 'views/partials'))

// DDBB
require('./db/db-connection')

// Model
const Coaster = require('./models/coaster.model')

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
    res.render('index-page');
});
app.get('/coasters-gallery', (req, res) => {
    Coaster
        .find()
        .then(allCoastersFromDB => {
            res.render('coasters-gallery', { allCoastersFromDB })
        })
        .catch(err => console.log(err))
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));