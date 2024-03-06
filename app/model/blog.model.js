const mongoose = require('mongoose');
const { CommentSchema } = require('./public.model');

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    urlTitle: { type: String },
    urlGoogle: { type: String, required: true },
    short_text: { type: String, required: true },
    text: { type: String, required: true },
    images: { type: [String], default: [] },
    category: { type: mongoose.Types.ObjectId, ref: "category" },
    status: { type: Boolean, default: false },
    comments: { type: [CommentSchema], ref: "comment", default: [] },
    item_type: { type: String, default: "blog" },
    numberLink: { type: Number, default: 0 },
    sortByNumber: {type: Number},
});
BlogSchema.index({ title: "text" })
module.exports = {
    BlogModel: mongoose.model("blog", BlogSchema)
}
