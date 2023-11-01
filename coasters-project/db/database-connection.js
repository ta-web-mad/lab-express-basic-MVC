const mongoose = require('mongoose')

// ddbb connection
const databaseName = 'themepark'                // OJO AQUÍ
const connectionString = `mongodb://127.0.0.1/${databaseName}`

mongoose
    .connect(connectionString)
    .then(connectionInfo => console.log(`Connected to Mongo! Database name: "${connectionInfo.connections[0].name}"`))
    .catch(err => console.error('Error connecting to mongo', err))

