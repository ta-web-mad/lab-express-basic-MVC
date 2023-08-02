// Happy coding! Party! 

const express = require('express')

const app = express()

// ---------- [CONFIGURATION] ----------
app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

// ---------- [DDBB CONNECTION] ----------
require('./db/database-connection')

//model 
const Coasters = require('./models/coaster.model')

// ---------- [ROUTING] ----------
app.get('/', (req, res) => {
    console.log("you are about to render home")
    res.render('home')
})

// ---------- [MAIN GALLERY] ----------

app.get('/coasters-gallery', (req, res) => {

    console.log("you are about to entender the coasters gallery")

    Coasters //find and render coasters from collection "coasters"

        .find()

        .sort({ title: 1 })

        .then(coasters => {

            res.render('coasters-gallery', { coasters })
        })

        .catch(err => console.log(err))

})

// ---------- [BONUS: LONGEST] ----------

app.get('/longest', (req, res) => {

    console.log("you are about to enter the gallery of longest coaster")

    Coasters

        .find({ length: { $gt: 100 } })

        .sort({ length: -1 })

        .then(coasters => {

            console.log("Coasters with length greater than 100:", coasters);
            res.render('longest', { coasters })
        })

        .catch(err => console.log(err))

})

// ---------- [BONUS: CRAZIEST] ----------

app.get('/craziest', (req, res) => {

    console.log("you are about to enter the gallery of craziest coaster")

    Coasters

        .find({ inversions: { $gt: 3 } })

        .sort({ inversions: -1 })

        .then(coasters => {

            console.log("Coasters with more than 3 inversions:", coasters);
            res.render('craziest', { coasters })
        })

        .catch(err => console.log(err))

})



app.listen(5005, () => console.log('Server running on port 5005'))