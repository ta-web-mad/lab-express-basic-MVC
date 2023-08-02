const mongoose = require('mongoose')


//DDBB Connection
const databaseName = 'themepark'
const connectionString = `mongodb://localhost/${databaseName}`

mongoose
    .connect(connectionString)
    .then(connectionInfo => console.log(`Conected to Mongo wiii DB name: "${connectionInfo.connections[0].name}`))
    .catch(err => console.error('error connecting to Mongo sorryyy', err))