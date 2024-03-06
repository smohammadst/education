const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    ip: { type: String }
});

const model = mongoose.model("link", linkSchema)

module.exports = {
    linkModel: model
}