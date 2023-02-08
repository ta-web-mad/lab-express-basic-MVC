const mongoose = require('mongoose')
const { deleteMany, insertMany } = require('../model/coaster.model')
const Coaster = require('../model/coaster.model')

const databaseName = 'themepark'
const connectionString = `mongodb://localhost/${databaseName}`

mongoose
    .set('strictQuery', true)
    .connect(connectionString)
    .then(connectionInfo => {
        console.log(`Connected to Mongo! Database name: ${connectionInfo.connections[0].name}`)
    })
    .catch(error => console.log('Error connecting to mongo', error))