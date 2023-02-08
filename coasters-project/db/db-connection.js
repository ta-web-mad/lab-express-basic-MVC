const mongoose = require('mongoose')

const dataBaseName = 'themepark'
const conectionString = `mongodb://localhost/${dataBaseName}`

mongoose
    .set('strictQuery', true)
    .connect(conectionString)
    .then(connectionInfo => console.log(`Connected to Mongo! Database name: "${connectionInfo.connections[0].name}"`))
    .catch(err => console.error('Error connection to Mongo', err))

