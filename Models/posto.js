const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postoSchema = new Schema({
    id: { 
        type: String, 
        required: [true, "O ID do posto é obrigatório"],
        unique: true,
        trim: true,
        minlength: [3, "O ID deve ter pelo menos 3 caracteres"],
        maxlength: [10, "O ID não pode exceder 10 caracteres"]
    },
    local: { 
        type: String, 
        required: [true, "O local do posto é obrigatório"],
        trim: true,
        minlength: [2, "O local deve ter pelo menos 2 caracteres"],
        maxlength: [50, "O local não pode exceder 50 caracteres"] 
    },
    potenciakw: { 
        type: Number, 
        required: [true, "A potência em kW é obrigatória"],
        validate: {
            validator: function(value) {
                return value > 0;
            },
            message: "A potência em kW deve ser superior a zero."
        },
        max: [520, "A potência máxima permitida é 520 kW"]
    },
    disponivel: { 
        type: Boolean, 
        required: [true, "O campo de disponibilidade é obrigatório"]
    }
}, { 
    timestamps: true
});

module.exports = mongoose.model("Posto", postoSchema, "postos");