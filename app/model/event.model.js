const { default: mongoose } = require("mongoose");
const eventSchema =  mongoose.Schema({
    title: { type: String, require: true },
    text: { type: String, require: true },
    images: { type: [String] },
    products: {type: Array} 
}, {
    toJSON: {
        virtuals: true
    }
})

const model = mongoose.model("event", eventSchema);

module.exports = {
    EventModl: model
}

