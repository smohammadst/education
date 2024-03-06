const { default: mongoose } = require("mongoose");

const ImageSchema = new mongoose.Schema({
    images: {type: [String], default: []},
}, {
    toJSON : {
        virtuals: true
    }
});

module.exports = {
    ImageModel: mongoose.model("image", ImageSchema),
}
