const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
    {
        memberName: {
            type: String,
            required: true,
        },

        memberId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Member',
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        date: {
            type: Date,
            default: Date.now,
        },

        dateDebut : { type: Date },
        dateFin :   { type: Date },

        method: {
            type: String,
            enum: ['carte_bancaire', 'paypal', 'virement_bancaire', 'especes'],
            required: true,
        },

        status: {
            type: String,
            enum: ['en_attente', 'effectue', 'echoue'],
            default: 'en_attente',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema);
