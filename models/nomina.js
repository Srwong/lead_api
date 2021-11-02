const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var nominaSchema = new Schema({
    usuarioID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'  //model
    },
    _id: {
        type:String
    },
    empresa: {
        type: String
    },
    ingreso: {
        type: Date
    },
    status:{
        type: Boolean
    }
}, {
    timestamps: true
});

var nonminas = mongoose.model('Nomina', nominaSchema);
module.exports = nonminas;