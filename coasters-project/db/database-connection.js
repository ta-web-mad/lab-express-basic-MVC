const mongoose = require('mongoose')

const databaseName = 'themepark'
const connectionString = 'mongodb://127.0.0.1:27017/themepark'


mongoose
    .connect(connectionString)
    .then(connectionInfo => console.log(`✅ Conexion establecida a BBDD : "${connectionInfo.connections[0].name}"`))
    .catch(err => console.error('❌ Error de conexion a BBDD ', err))