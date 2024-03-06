const Joi = require("@hapi/joi");
const createError = require("http-errors");
const { MongoIDPattern } = require("../../../module/constans");
const createBlogSchema = Joi.object({
    title : Joi.string().empty('').min(3).max(60).error(createError.BadRequest("عنوان دسته بندی صحیح نمیباشد")),
    urlTitle : Joi.string().empty(''),
    urlGoogle : Joi.string().empty(''),
    text: Joi.string().empty('').error(createError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    short_text: Joi.string().empty('').error(createError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    status: Joi.boolean().empty(''),
    images: Joi.array().allow().empty(''),
    category: Joi.string().empty('').pattern(MongoIDPattern).error(createError.BadRequest("ایدی ارسال شده اشتباه میباشد")),
});

module.exports = {
    createBlogSchema
}



