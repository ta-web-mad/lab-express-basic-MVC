const { Schema, model } = require('mongoose')
const { stringify } = require('querystring')

const coasterSchema = new Schema({
    // fill here all the coaster properties. All right!
    title: String,
    description: String,
    inversions: Number,
    length: Number,
    imageUrl: String
})

const Coaster = model('Coaster', coasterSchema)

module.exports = Coaster