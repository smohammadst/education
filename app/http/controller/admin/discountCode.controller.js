const Controller = require("../controller");
const { discountCodeGenerator } = require("../../../module/function");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const { DiscountCodeModel } = require("../../../model/discountCode.model");
const createHttpError = require("http-errors");

class DiscountCode extends Controller {
    async addCode(req, res, next){
        try {
            const {percent} = req.body;
            const code = discountCodeGenerator()
            const add = await DiscountCodeModel.create({code, percent: +percent})
            if(!add) throw createHttpError.InternalServerError("کد تفخفیف ثبت نشد")
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                message: "ثبت کد تخفیف موفقیت آمیز بود"
            })
        } catch (error) {
            next(error)
        }

    }
    async removeCode(req, res, next){
        try {
            const {id} = req.params;
            const discountCode = await DiscountCodeModel.findOne({_id: id})
            if(!discountCode) throw createHttpError.NotFound("کد تخفیف یافت نشد")
            const result = await DiscountCodeModel.deleteOne({_id: id})
            if (result.deletedCount == 0) throw createError.InternalServerError("حذف انجام نشد");
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: "حذف کد تخفیف با موفقیت انجام شد"
            })
        } catch (error) {
            next(error)
        }
    }

    async getListCode(req, res, next){
        try {
            const discountCode = await DiscountCodeModel.find({})
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                discountCode
            })
        } catch (error) {
            next(error)
        }
    }
    async check(req, res, next){
        try {
            const {code} = req.body;
            const result = await DiscountCodeModel.findOne({code: code})
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                result
            })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = {
    DiscountCode: new DiscountCode()
}

