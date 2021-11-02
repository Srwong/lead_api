const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const uniqueValidator = require('mongoose-unique-validator');

let usuarioSchema = new Schema({
    _id: {
        type:String,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
    },
    password: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    telefono: {
        required: true,
        type: Number
    },
    rfc: {
        type: String,
        required: true,
        unique: true
    },
    domicilio: {
        required: true,
        type: String
    }
}, {
    collection: 'usuarios',
    timestamps: true
})

//usuarioSchema.plugin(uniqueValidator, { message: 'Campo ya esta en uso.' });
module.exports = mongoose.model('Usuario', usuarioSchema)