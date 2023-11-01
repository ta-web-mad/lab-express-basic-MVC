const { Schema, model } = require('mongoose')

const coasterSchema = new Schema({
    title: String,
    description: String,
    length: Number,
    inversions: Number,
    imgeUrl: String,
})

const Coaster = model('coasters', coasterSchema)

module.exports = Coaster