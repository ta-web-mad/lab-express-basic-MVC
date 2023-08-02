const express = require('express')
const hbs = require('hbs')

const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

require('./db/database-connection')

hbs.registerPartials(`${__dirname}/views/partials`)

const Coaster = require('./models/coaster.model')

app.get('/', (req, res) => {
	Coaster.findOne({ title: 'Steel Dragon 2000' })
		.then(coaster => {
			res.render('home', { coaster })
		})
		.catch(error => console.log(error))
})

app.get('/coasters-gallery', (req, res) => {
	Coaster.find()
		.sort({ title: 1 })
		.then(coasters => res.render('gallery', { coasters }))
		.catch(error => console.log(error))
})

app.get('/longest', (req, res) => {
	Coaster.find({ length: { $gt: 100 } })
		.then(coasters => res.render('longest-gallery', { coasters }))
		.catch(error => console.log(error))
})
app.get('/craziest', (req, res) => {
	Coaster.find({ inversions: { $gt: 3 } })
		.then(coasters => res.render('craziest-gallery', { coasters }))
		.catch(error => console.log(error))
})

app.listen('5005', () => console.log('Running!'))
