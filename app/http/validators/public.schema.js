const Joi = require("@hapi/joi")
const { MongoIDPattern } = require("../../module/constans")
const createError = require("http-errors")
const ObjectIdValidator = Joi.object({
    id : Joi.string().pattern(MongoIDPattern).error(new Error(createError.BadRequest("شناسه وارد شده صحیح نمیباشد"))),


})

module.exports = {
    ObjectIdValidator
}
