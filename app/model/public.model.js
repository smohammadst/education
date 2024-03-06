const { default: mongoose } = require("mongoose");
const AwnswerSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    comment: { type: String, required: true },
    show: { type: Boolean, required: true },
    likes: { type: [mongoose.Types.ObjectId], ref: "user" },
    isShowAdmin: { type: Boolean, default: false }
}, {
    timestamps: { createdAt: true }
})
const CommentSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    comment: { type: String, required: true },
    show: { type: Boolean, required: true, default: false },
    email: { type: String },
    answer: { type: [AwnswerSchema], default: [] },
    isShowAdmin: { type: Boolean, default: false }
}, {
    timestamps: { createdAt: true }
})

module.exports = {
    CommentSchema
}