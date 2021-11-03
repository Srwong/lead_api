const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var autoSchema = new Schema({
    usuarioID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'  //model
    },
    autoLeadID: {
        type: String,
        unique: true,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    status:{
        type: Boolean
    }
}, {
    timestamps: true
});

var autos = mongoose.model('Auto', autoSchema);
module.exports = autos;