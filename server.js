// Happy coding! Party! 
require('./db/database-connection')

const express = require('express')
const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

const Coaster = require('./models/coaster.model')

app.get('/', (req, res) => {
    res.render('home-page')
})

app.get('/coasters-gallery', (req, res) => {
    Coaster
        .find()
        .then(coasters => {
            res.render('coasters-gallery', { coasters: coasters })
        })
        .catch(err => console.log(err))
})

app.listen(5005, () => console.log('PEPO PINTA QUE PINTA PINTA PEPO'))