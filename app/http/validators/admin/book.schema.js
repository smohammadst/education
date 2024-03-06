const Joi = require("@hapi/joi")
const createError = require("http-errors")
const { MongoIDPattern } = require("../../../module/constans")
const createBookSchema = Joi.object({
    title: Joi.string().empty('').min(3).max(60).error(createError.BadRequest("عنوان محصول باید حداقل 3 و حداکثر 30 کاراکتر باشد")),
    urlTitle: Joi.string().empty(''),
    urlGoogle: Joi.string().empty(''),
    text: Joi.string().empty('').error(createError.BadRequest("متن ارسال شده باید استرینگ باشد")),
    short_text: Joi.string().error(createError.BadRequest("متن ارسال شده باید استرینگ باشد")),
    category: Joi.string().empty('').pattern(MongoIDPattern).error(createError.BadRequest("ایدی ارسال شده اشتباه میباشد")),
    pricePhysical: Joi.string().empty('').error(createError.BadRequest("قیمت وارد شده کتاب فیزیکی صحیح نمیباشد")),
    priceVirtual: Joi.string().empty('').error(createError.BadRequest("قیمت وارد شده کتاب دیجیتال صحیح نمیباشد")),
    discount: Joi.string().empty('').error(createError.BadRequest("تخفیف وارد شده صحیح نمیباشد")),
    numberOfPages: Joi.string().empty('').allow().error(createError.BadRequest("تخفیف وارد شده صحیح نمیباشد")),
    yearOfPublication: Joi.string().empty('').allow().error(createError.BadRequest("تخفیف وارد شده صحیح نمیباشد")),
    images: Joi.array().allow().empty('').error(createError.BadRequest("تخفیف وارد شده صحیح نمیباشد")),
    link: Joi.string().allow().empty(''),
})
module.exports = {
    createBookSchema
}
