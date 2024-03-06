const createError = require("http-errors");
const { CategoryModel } = require("../../../model/categories.model");
const { createCategorySchema } = require("../../validators/admin/category.schema");
const Controller = require("../controller");
const { StatusCodes:HttpStatus} = require("http-status-codes");
class CategoryController extends Controller{
    async addCategory(req, res, next){
        try {
            const bodyData = await createCategorySchema.validateAsync(req.body)
            const {title, parent} = bodyData
            if (await CategoryModel.findOne({title}, {__v: 0, parent: 0}) ) {
                throw createError.BadRequest(
                    'این دسته بندی با این عنوان وجود دارد',
                );
            }
            if (parent && !await CategoryModel.findOne({_id: parent})) {
                throw createError.BadRequest(
                    'Not a valid parent.',
                );
            }
            if(!parent){
                const category = await CategoryModel.create({title})
                if(!category) throw createError.InternalServerError("خطای داخلی")
                return res.status(HttpStatus.CREATED).json({
                    statusCode: HttpStatus.CREATED,
                    message: "دسته بندی با موفقیت ثبت شد"
            })
            }else{
                const category = await CategoryModel.create({title, parent})
                if(!category) throw createError.InternalServerError("خطای داخلی")
                return res.status(HttpStatus.CREATED).json({
                    statusCode: HttpStatus.CREATED,
                    message: "دسته بندی با موفقیت ثبت شد"
                })

            }
            
        } catch (error) {
            next(error)
        }
    }
    async removeCategory(req, res, next){
        try {
            const {id} = req.params;
            const category = await CategoryModel.findOne({_id: id})
            if(!category) throw createError.NotFound("چنین دسته بندی وجود ندارد")
            const result = await CategoryModel.deleteMany({$or: [{_id:id}, {parent: id}]})
            if(result.deletedCount == 0) throw createError.InternalServerError("حذف دسته بندی موفقیت امیز نبود")
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: "حذف دسته بندی با موفقیت انجام شد"
            })
        } catch (error) {
            next(error)
        }
    }
    async editCategory(req, res, next){
        try {
            const {id} = req.params;
            await createCategorySchema.validateAsync(req.body)
            const {title, parent} = req.body
            let result;
            if(!parent){
                result = await CategoryModel.updateOne({_id: id}, {$set: {title}})
            }else {
                result = await CategoryModel.updateOne({_id: id}, {$set: {title, parent}})
            }
            if(!result) throw createError.InternalServerError("به روز رسانی دسته بندی انجام نشد")
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: "بروز رسانی با موفقیت انجام شد"
            })
                
        } catch (error) {
            next(error)
        }
    }

}


module.exports = {
    CategoryController: new CategoryController()
}