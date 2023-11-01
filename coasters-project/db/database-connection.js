const mongoose = require('mongoose')
const databaseName = 'themepark'
const conectionString = `mongodb://127.0.0.1/${databaseName}`

mongoose
    .connect(conectionString)
    .then(connectionInfo => console.log(`Conected to Mongo, Database name: "${connectionInfo.connections[0].name}" `))
    .catch(err => console.error('Error conecting to mongo', err))


mongoose.connection.on('connected', () => console.log('Mongoose default connection open'));
mongoose.connection.on('error', err => console.log(`Mongoose default connection error: ${err}`));
mongoose.connection.on('disconnected', () => console.log('Mongoose default connection disconnected'));
process.on('SIGINT', () => {
    mongoose.connection.close()
    console.log('Mongoose default connection disconnected through app termination')
})