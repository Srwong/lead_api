const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var casaSchema = new Schema({
    usuarioID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'  //model
    },
    _id: {
        type:String
    },
    domicilio: {
        type: String
    },
    valor: {
        type: Number
    },
    status:{
        type: Boolean
    }
}, {
    timestamps: true
});

var casas = mongoose.model('Casa', casaSchema);
module.exports = casas;