const mongoose = require('mongoose');

const viewSchema = new mongoose.Schema({
    nameUser: { type: String, require: true },
    description: { type: String, require: true },
    nameCourse: { type: String, require: true }
}, {
    timestamps: { createdAt: true }
})

const model = mongoose.model("view", viewSchema);

module.exports = {
    ViewModl: model
}