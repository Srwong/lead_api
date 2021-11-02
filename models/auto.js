const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var autoSchema = new Schema({
    usuarioID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'  //model
    },
    _id: {
        type:String
    },
    modelo: {
        type: String
    },
    precio: {
        type: Number
    },
    status:{
        type: Boolean
    }
}, {
    timestamps: true
});

var autos = mongoose.model('Auto', autoSchema);
module.exports = autos;