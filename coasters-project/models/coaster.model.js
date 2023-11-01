const { Schema, model } = require('mongoose')
const { stringify } = require('querystring')

const coasterSchema = new Schema({
    // fill here all the coaster properties. All right!
    title: String,
    description: String,
    length: Number,
    inversions: Number,
    imageUrl: String
})

const Coaster = model('coaster', coasterSchema)

module.exports = Coaster


