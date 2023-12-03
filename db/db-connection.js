const mongoose = require('mongoose')

const connectionString = 'mongodb://127.0.0.1:27017/themepark'

const data = require('../coasters-data.json')

const Coaster = require('../models/coaster.model')

mongoose
    .set('strictQuery', true)
    .connect(connectionString)
    .then(() => Coaster.deleteMany())
    .then(() => Coaster.insertMany(data))
    .catch(err => console.log('Error conectando a Mongo', err))