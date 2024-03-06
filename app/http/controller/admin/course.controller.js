const Controller = require("../controller");
const { createCourseSchema } = require("../../validators/admin/course.schema");
const createError = require("http-errors");
const { CouresModel } = require("../../../model/course.model");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const { CategoryModel } = require("../../../model/categories.model");
const { ObjectIdValidator } = require("../../validators/public.schema");
const { copyObject } = require("../../../module/function");

class CourseController extends Controller {
  async addCoure(req, res, next) {
    try {
      let finalPrice = 0;
      // console.log(req.body);
      const coursebody = await createCourseSchema.validateAsync(req.body);
      let {
        title,
        urlTitle,
        urlGoogle,
        short_text,
        text,
        category,
        price,
        discount,
        type,
        level,
        images,
        spotPlayerID
      } = coursebody;
      price = +price
      discount = +discount
      const originimage = images.map(e => e.slice(33, e.length))
      if (discount > 0 && discount != 0) {
        const add = (discount * price) / 100;
        finalPrice = price - add;
        finalPrice = Math.floor(finalPrice / 10000) * 10000
      } else {
        finalPrice = price;
        finalPrice = Math.floor(finalPrice / 10000) * 10000
      }
      const findCategory = await CategoryModel.findOne({ category });
      // console.log(findCategory);
      if (!findCategory)
        throw createError.NotFound("ایدی ارسال شده دسته بندی اشتباه میباشد");
      const course = await CouresModel.create({
        title,
        urlTitle,
        urlGoogle,
        short_text,
        text,
        category,
        price,
        finalPrice,
        discount,
        type,
        level,
        images: originimage,
        spotPlayerID
      });
      if (!course) throw createError.InternalServerError("دوره ثبت نشد");
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: "ثبت دوره موفقیت امیز بود"
      });
    } catch (error) {
      next(error);
    }
  }
  async editCourse(req, res, next) {
    try {
      // console.log(req.body);
      const data = await createCourseSchema.validateAsync(req.body);
      const { id } = req.params;
      const course = await this.findCourseById(id);
      const findCategory = await CategoryModel.findOne({ category: data.category });
      if (!findCategory)
        throw createError.NotFound("ایدی ارسال شده دسته بندی اشتباه میباشد");
      if (data.price) {
        let finalPrice = 0;
        if (data.discount != 0 && data.discount > 0) {
          const add = (data.price * data.discount) / 100;
          finalPrice = data.price - add;
          finalPrice = Math.floor(finalPrice / 10000) * 10000
        } else {
          finalPrice = data.price;
          finalPrice = Math.floor(finalPrice / 10000) * 10000
        }
        data.finalPrice = finalPrice;
      }
      const editCourseResult = await CouresModel.updateOne(
        { _id: course._id },
        { $set: data }
      );
      if (editCourseResult.modifiedCount == 0)
        throw createError.InternalServerError("خطای داخلی");
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "اپدیت دوره با موفقیت انجام شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async removeCourse(req, res, next) {
    try {
      const { id } = req.params;
      const course = await this.findCourseById(id);
      const result = await CouresModel.deleteOne({ _id: course._id });
      if (result.deletedCount == 0)
        throw createError.InternalServerError("حذف انجام نشد");
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "خذف دوره با موفقیت انجام شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async findCourseById(courseID) {
    const { id } = await ObjectIdValidator.validateAsync({ id: courseID });
    const course = await CouresModel.findById(id);
    if (!course) throw createError.NotFound("دوره ای یافت نشد");
    return course;
  }

}

module.exports = {
  CourseController: new CourseController(),
};
