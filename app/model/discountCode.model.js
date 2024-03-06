const { default: mongoose } = require("mongoose");

const DiscountCodeSchema = new mongoose.Schema({
    percent: {type: Number, default: 0},
    code: {type: String, default: ''}
}, {
    toJSON : {
        virtuals: true
    }
});

module.exports = {
    DiscountCodeModel: mongoose.model("discountCode", DiscountCodeSchema),
}
