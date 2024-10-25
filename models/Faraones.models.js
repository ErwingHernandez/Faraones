const mongoose = require('mongoose')

const FaraonSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    dinastia: {
        type: Number,
        required: false
    },
    reinado: {
        type: String,
        required: true
    },
    logros: [
        {
            type: String
        }
    ],
    lugar_descubrimiento_tumba: {
        type: String,
        required: false
    },
    descubrimiento: {
        año: {
            type: Number,
            required: false
        },
        descubridor: {
            type: String,
            required: false
        }
    }
});

const Faraon = mongoose.model('Faraon', FaraonSchema);

module.exports = Faraon;