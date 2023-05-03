const { Schema, model } = require('mongoose')

const coasterSchema = new Schema({
    title: String,
    description: String,
    length: Number,
    inversions: Number,
    imageUrl: String,
})

const Coaster = model('coaster', coasterSchema)

module.exports = Coaster