const mongoose = require('mongoose')

const connectionString = `mongodb://127.0.0.1:27017/themepark`
const data = require('../coasters-data.json')

const Coaster = require('../models/coaster.model')

mongoose
    .set('strictQuery', true)
    .connect(connectionString)
    .then(connectionInfo => console.log(`Connected to Mongo! Database name: "${connectionInfo.connections[0].name}"`))
    .catch(err => console.error('Error connecting to mongo', err))