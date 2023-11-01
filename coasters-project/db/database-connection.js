const mongoose = require('mongoose')

const dataBaseName = "themepark"
const connectionString = `mongodb://localhost/${dataBaseName}`

mongoose
    .connect(connectionString)
    .then(connectionInfo => console.log(`Connected to Mongo! Database name: "${connectionInfo.connections[0].name}"`))
    .catch(err => console.error('Error connecting to mongo', err))