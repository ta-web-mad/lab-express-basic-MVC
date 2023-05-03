// Happy coding! Party! 
require('./db/database-connection')

const express = require('express')
const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

const Coaster = require('./models/coaster.model')

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/coasters-gallery', (req, res) => {

    Coaster
        .find()
        .then((allCoasters) => {
            console.log('testing testing', allCoasters);
            res.render('coasters-gallery', { coasters: allCoasters })
        })
        .catch(err => console.log(err))

})

app.listen(3000, () => console.log('SERVER UP AT 3000'))