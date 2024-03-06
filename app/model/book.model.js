const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./public.model");

const BooktSchema = new mongoose.Schema({
    title: { type: String, required: true },
    urlTitle: { type: String},
    urlGoogle: { type: String, required: true },
    short_text: { type: String, required: true },
    text: { type: String, required: true },
    images: { type: [String], default: [] },
    category: { type: mongoose.Types.ObjectId, ref: "category" },
    numberOfPages: { type: Number, required: true },
    yearOfPublication: { type: String, required: true },
    pricePhysical: { type: Number, default: 0 },
    priceVirtual: { type: Number, default: 0 },
    finalPricePhysical: { type: Number, default: 0 },
    finalPriceVirtual: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    comments: { type: [CommentSchema], ref: "user", default: [] },
    sale: { type: Number, default: 0 },
    link: { type: String, default: '' },
    item_type: { type: String, default: "book" },
    numberLink: { type: Number, default: 0 }

}, {
    toJSON: {
        virtuals: true
    }

})
BooktSchema.index({ title: "text" })

module.exports = {
    BookModel: mongoose.model("book", BooktSchema)
}