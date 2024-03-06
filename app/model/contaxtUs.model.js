const mongoose = require('mongoose');

const constactScema = new mongoose.Schema({
    name: { type: String, default: "" },
    phone: { type: String, default: "" },
    time: { type: String, default: "" },
    text: { type: String, default: "" },
    subject: { type: String, default: "" },
    status: { type: Boolean, default: false }
}, {
    timestamps: true
})

const model = mongoose.model("contact", constactScema);

module.exports = {
    ContactModel: model
}