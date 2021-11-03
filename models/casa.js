const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var casaSchema = new Schema({
    usuarioID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'  //model
    },
    casaLeadID: {
        type:String,
        unique: true,
        reqiuired: true
    },
    domicilio: {
        type: String,
        required: true,
    },
    valor: {
        type: Number,
        required: true
    },
    status:{
        type: Boolean
    }
}, {
    timestamps: true
});

var casas = mongoose.model('Casa', casaSchema);
module.exports = casas;