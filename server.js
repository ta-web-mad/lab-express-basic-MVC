const express = require('express')

const app = express()

app.use(express.static('public'))
app.set('views', `./views`)
app.set('view engine', 'hbs')

// ddbb connection
require('./db/database-connection')

//model
const Coaster = require('./models/coaster.model')



app.get('/', (req, res) => {
    res.render("index")
})

app.get('/coastersGallery', (req, res) => {

    Coaster
        .find()
        .then(coasters => res.render('coastersGallery', { coasters }))
        .catch(err => console.log(err))
})






app.listen(5005, () => console.log('Server running on port 5005'))
