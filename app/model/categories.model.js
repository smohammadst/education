const { default: mongoose } = require("mongoose");

const CategorySchema = new mongoose.Schema({
    title : {type : String, required : true},
    parent : {type : mongoose.Types.ObjectId, ref: "category", default : undefined, required: false}
}, {
    id : false,
    toJSON : {
        virtuals: true
    }
});

module.exports = {
    CategoryModel: mongoose.model("category", CategorySchema),
}

