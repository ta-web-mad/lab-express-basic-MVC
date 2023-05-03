const mongoose = require('mongoose')

const { deleteMany, insertMany } = require('../bin/coasters.model')
const Coaster = require('../bin/coasters.model')

const databaseName = 'themepark'
const connectionString = `mongodb://localhost/${databaseName}`

mongoose
    .set('strictQuery', false)
    .connect(connectionString)
    .then(connectionInfo => console.log(`Connected to Mongo! Database name: "${connectionInfo.connections[0].name}"`))
    .catch(err => console.error('Error connecting to mongo', err))