const moongose = require('mongoose')

const databaseName = 'themepark';
const connectionString = `mongodb://localhost/${databaseName}`

moongose
    .connect(connectionString)
    .then(connectionInfo => console.log(`connected :) into database ` + databaseName))
    .catch(err => console.error('error :(', err))