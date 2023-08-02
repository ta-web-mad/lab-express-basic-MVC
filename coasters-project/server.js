// Happy coding! Party! 
const express = require('express')

const hbs = require('hbs')
const Coaster = require('./models/coaster.model')

const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

//conexión a la base de datos
require('./db/database-connection')

//"llama" al modelo 
const coaster = require('./models/coaster.model.js')

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/coasters-gallery', (req, res) => {
    res.render('coasters-gallery');

});



app.listen(5005, () => console.log('Server running on port 5005'))