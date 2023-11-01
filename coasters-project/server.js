// Happy coding! Party! 
const express = require('express')

const app = express()



app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')



require('./db/database-connection')
const Coaster = require('./models/coaster.model')




app.get('/', (req, res) => {
    res.render('home-coaster')
})

app.get('/coasters-gallery', (req, res) => {

    Coaster
        .find()
        .sort({ title: 1 })
        .then(coaster => res.render('galleryCoaster', { coast: coaster }))
        .catch(err => console.log('ERROR:', err))
})


app.get('/longest', (req, res) => {

    Coaster
        .find({ length: { $gte: 100 } })
        .then(coaster => res.render('longest', { coast: coaster }))
        .catch(err => console.log('ERROR:', err))
})


app.get('/crazy', (req, res) => {

    Coaster
        .find({ inversions: { $gte: 3 } })
        .then(coaster => res.render('crazyList', { coast: coaster }))
        .catch(err => console.log('ERROR:', err))
})




app.listen(5005, () => console.log('i am redy in 5005'))

