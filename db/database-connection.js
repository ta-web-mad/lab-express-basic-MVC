const mongoose = require("mongoose")

const databaseName = "coaster-prueba"
const connectiontoString = `mongodb://127.0.0.1/${databaseName}`

mongoose
    .connect(connectiontoString)
    .then(connectionInfo => console.log(`Connected to database ${databaseName}`))