const express = require('express')
const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

require('./db/database-connection')

const Coaster = require('./models/coaster.model')

app.get('/', (req, res) => {
    Coaster
        .find()
        .sort({ title: -1 })
        .limit(1)
        .then(coasters => res.render('home-page', { coasters })
        )
        .catch(err => console.log(err));
});

app.get('/coasters-gallery', (req, res) => {
    Coaster
        .find()
        .sort({ title: 1 })
        .then(coasters => res.render('coasters-gallery', { coasters })
        )
        .catch(err => console.log(err));
});

app.get('/longest', (req, res) => {
    Coaster
        .find({ length: { $gt: 100 } })
        .sort({ length: 1 })
        .then(coasters => res.render('longest', { coasters })
        )
        .catch(err => console.log(err));
});

app.get('/craziest', (req, res) => {
    Coaster
        .find({ inversions: { $gt: 3 } })
        .sort({ inversions: 1 })
        .then(coasters => res.render('craziest', { coasters })
        )
        .catch(err => console.log(err));
});

app.listen(5007, () => console.log('Server running on port 5007'))  