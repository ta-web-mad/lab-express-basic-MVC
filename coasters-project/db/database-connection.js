const mongoose = require('mongoose')

const databaseName = 'themepark'
const connectionString = `mongodb://localhost/${databaseName}`

mongoose
    .connect(connectionString)
    .then(connectionInfo => console.log(`Connected to Mongo! Database name: "${connectionInfo.connections[0].name}"`))
    .catch(err => console.error('Error connecting to mongo', err))


mongoose.connection.on('connected', () => console.log('Mongoose default connection open'));

mongoose.connection.on('error', err => console.log(`Mongoose default connection error: ${err}`));
    
mongoose.connection.on('disconnected', () => console.log('Mongoose default connection disconnected'));
    
process.on('SIGINT', () => {
    mongoose.connection.close()
    console.log('Mongoose default connection disconnected through app termination')
})