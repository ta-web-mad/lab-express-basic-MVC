const { Schema, model } = require('mongoose')

const coasterSchema = new Schema({
    title: {
        type: String,
        required: true,
        default: 'Nombre desconocido',
        minlength: 2,
        maxlength: 100,
        trim: true,
    },
    description: {
        type: String,
        default: 'Sin descripción',
        trim: true,
    },
    length: {
        type: Number,
        min: 1,
        max: 9999
    },
    inversions: {
        type: Number,
        min: 1,
        max: 9999
    },
    imageUrl: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930',
        trim: true,
    }
})

const Coaster = model('coaster', coasterSchema)

module.exports = Coaster