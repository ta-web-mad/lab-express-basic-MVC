// Happy coding! Party! 
const express = require('express')

const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

require('./db/database-connection')
const Coaster = require('./models/coaster.model')

app.get('/', (req, res) => {
   // res.send('holi?')
   res.render('home-page')
})

app.get('/galeria',(req, res) =>{
   // res.send('holaaaa')
  // res.render('gallery')

   Coaster
   .find()
   .sort({title: 1})
   .then(coasters=> res.render('gallery', {coast: coasters}))
   .catch(err => console.log('ERROR:', err))
})



app.listen(5005, () => console.log('Server listening on port 5005'))