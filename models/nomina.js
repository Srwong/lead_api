const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var nominaSchema = new Schema({
    usuarioID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'  //model
    },
    nominaLeadID: {
        type:String,
        unique:true
    },
    empresa: {
        type: String
    },
    ingreso: {
        type: Date,
        required:true
    },
    status:{
        type: Boolean
    }
}, {
    timestamps: true
});

var nonminas = mongoose.model('Nomina', nominaSchema);
module.exports = nonminas;