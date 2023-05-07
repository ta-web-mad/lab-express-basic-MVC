const { Schema, model } = require('mongoose')

const coasterSchema = new Schema({
    title: String,
    description: String,
    length: Number,
    inversions: Number,
    imageUrl: String

})

const Coaster = model('coaster', coasterSchema)

module.exports = Coaster

// //*****
// const mongoose = require('mongoose'); //--> here you're importing the whole mongoose library
// const Schema = mongoose.Schema; // --> because of the above, accessing each property or method must be done with the . notation,
//                                     //ie: mongoose.Schema and mongoose.model
// const coasterSchema = new Schema({
//     title: String,
//     description: String,
//     length: Number,
//     inversions: Number,
//     imageUrl: String
// });

// const Coaster = mongoose.model('Coaster', coasterSchema);