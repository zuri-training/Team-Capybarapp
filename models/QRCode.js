const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose)

const qrcodeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    qrtext: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("QRCode", qrcodeSchema)