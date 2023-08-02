const mongoose = require('mongoose')

const connectionString = `mongodb://localhost/themepark`

mongoose
	.connect(connectionString)
	.then(connectionInfo =>
		console.log(`Connected to Mongo! Database name: "${connectionInfo.connections[0].name}"`)
	)
	.catch(err => console.error('Error connecting to mongo', err))
