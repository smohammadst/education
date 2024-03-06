const Joi = require("@hapi/joi");
const createError = require("http-errors");
const { MongoIDPattern } = require("../../../module/constans")
const createCourseSchema = Joi.object({
    title: Joi.string().empty('').min(3).max(120).error(createError.BadRequest("عنوان دوره صحیح نمیباشد")),
    urlTitle: Joi.string().empty(''),
    urlGoogle: Joi.string().empty(''),
    text: Joi.string().empty('').error(createError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    short_text: Joi.string().empty('').error(createError.BadRequest("متن  کوتاه ارسال شده صحیح نمیباشد")),
    category: Joi.string().empty('').pattern(MongoIDPattern).error(createError.BadRequest("ایدی ارسال شده اشتباه میباشد")),
    price: Joi.string().empty('').error(createError.BadRequest("قیمت وارد شده صحیح نمیباشد")),
    discount: Joi.string().empty('').error(createError.BadRequest("تخفیف وارد شده صحیح نمیباشد")),
    type: Joi.string().empty('').regex(/(online|offline|inPerson)/i),
    level: Joi.string().empty('').regex(/(پیشرفته|متوسط|مبتدی)/i).error(createError.BadRequest("سطح دوره باید مبتدی، متوسط یا پیشرفته باشد")).allow(),
    images: Joi.array().empty('').allow(),
    spotPlayerID: Joi.string().empty('').allow(),
    
})
const createEpisodeSchema = Joi.object({
    title : Joi.string().min(3).max(400).error(createError.BadRequest("عنوان دوره صحیح نمیباشد")),
    text: Joi.string().error(createError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    chapterID: Joi.string().regex(MongoIDPattern).error(createError.BadRequest("شناسه ی فصل صحیح نمیباشد")),
    courseID: Joi.string().regex(MongoIDPattern).error(createError.BadRequest("شناسه ی دوره صحیح نمیباشد"))
});
module.exports = {
    createCourseSchema,
    createEpisodeSchema
}
