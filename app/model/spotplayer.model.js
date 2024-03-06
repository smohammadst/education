const mongoose = require('mongoose');

const SpotPlayerSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, default: "" },
    spotPlayer: {
        type: Array
    },
    idSP: { type: String, default: '' },
    authority: { type: String, default: '' }
})

const model = mongoose.model("spotplayer", SpotPlayerSchema);

module.exports = {
    SpotPlayerModel: model
}