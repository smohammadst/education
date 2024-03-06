const Joi = require("joi")
const createError = require("http-errors");
const {MongoIDPattern} = require("../../../module/constans")
const createCategorySchema = Joi.object({
    title : Joi.string().min(3).max(60).error(createError.BadRequest("عنوان دسته بندی صحیح نمیباشد")),
    parent: Joi.string().allow('').empty().pattern(MongoIDPattern).error(createError.BadRequest("شناسه ارسال شده صحیح نمیباشد"))
});

module.exports = {
    createCategorySchema
}
