const Joi = require("@hapi/joi");
const createError = require("http-errors");
const createEventSchema = Joi.object({
    title : Joi.string().empty('').min(3).max(100).error(createError.BadRequest("عنوان دسته بندی صحیح نمیباشد")),
    text: Joi.string().empty('').error(createError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    images: Joi.array().allow().empty(''),
    courses: Joi.array().allow().empty(''),
    books: Joi.array().allow().empty(''),
    
});

module.exports = {
    createEventSchema
}


