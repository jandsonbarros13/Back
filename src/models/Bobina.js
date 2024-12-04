const mongoose = require('mongoose');

const bobinaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    peso: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Bobina = mongoose.model('Bobina', bobinaSchema);
module.exports = Bobina;