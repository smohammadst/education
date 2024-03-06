const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./public.model");

const Episodes = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    time: { type: String, required: true },
}, {
    toJSON: { virtuals: true }
})
const Chapter = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    episodes: { type: [Episodes], default: [] },
    time: {
        hour: Number,
        min: Number
    },
    numberOfSessions: { type: Number, default: 0 }
}, {
    toJSON: { virtuals: true }
})

const FAQ = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true }
})
const CourseSchema = mongoose.Schema({
    title: { type: String, required: true },
    urlTitle: { type: String },
    urlGoogle: { type: String, required: true },
    text: { type: String, required: true },
    short_text: { type: String, required: true },
    category: { type: mongoose.Types.ObjectId, ref: "category" },
    images: { type: [String], default: [] },
    price: { type: Number, required: true },
    discount: { type: Number },
    finalPrice: { type: Number, default: 0 },
    type: { type: String, default: "online" },
    level: { type: String },
    chapters: { type: [Chapter], default: [] },
    comments: { type: [CommentSchema], default: [] },
    bookmarks: { type: [mongoose.Types.ObjectId], default: [] },
    frequentlyAskedQuestions: { type: [FAQ], default: [] },
    sale: { type: Number, default: 0 },
    item_type: { type: String, default: "course" },
    spotPlayerID: { type: String, default: "" },
    numberLink: { type: Number, default: 0 }
}, {
    toJSON: { virtuals: true }
})
CourseSchema.index({ title: "text" })
const model = mongoose.model("course", CourseSchema)

module.exports = {
    CouresModel: model
}


