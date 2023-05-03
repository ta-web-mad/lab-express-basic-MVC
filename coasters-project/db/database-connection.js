const mongoose = require('mongoose')

const databaseName = 'themepark'
const connectionString = `mongodb://localhost/${databaseName}`

mongoose
    .connect(connectionString)
    .then(connectionInfo => console.log(`connected to --> "${connectionInfo.connections[0].name}" yay`))
    .catch(err => console.error('error connecting to Mongo', err))

// When successfully connected
mongoose.connection.on('connected', () => console.log('Mongoose default connection up and running'));

// If the connection throws an error
mongoose.connection.on('error', err => console.log(`UH-OH Mongoose default connection error: ${err}`));

// When the connection is disconnected
mongoose.connection.on('disconnected', () => console.log('UEUEUEUE Mongoose default connection disconnected'));

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
    mongoose.connection.close()
    console.log('AH THIS! Mongoose default connection disconnected through app termination')
})