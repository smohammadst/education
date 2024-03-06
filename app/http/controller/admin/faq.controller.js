const Controller = require("../controller");
const { createCourseSchema } = require("../../validators/admin/course.schema");
const createError = require("http-errors");
const { CouresModel } = require("../../../model/course.model");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const { ObjectIdValidator } = require("../../validators/public.schema");

class FaqController extends Controller {
  async addFaq(req, res, next) {
    try {
      const { courseID } = req.params;
      const data = req.body;
      const course = await this.findCourseById(courseID);
      const result = await CouresModel.updateOne(
        { _id: course._id },
        { $push: { frequentlyAskedQuestions: data } }
      );
      if (!result)
        throw createError.InternalServerError("سوالات متداول ایجاد نشد");
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: "سوالات متداول با موفقیت ایجاد",
      });
    } catch (error) {
      next(error);
    }
  }
  async editFaq(req, res, next) {
    try {
        const { id } = req.params;
        await this.getOneFaq(id);
        const data = req.body;
        const result = await CouresModel.updateOne(
            { "frequentlyAskedQuestions._id": id },
            { $set: { "frequentlyAskedQuestions.$": data } }
        );
        if (!result)
            throw createError.InternalServerError("سوالات متداول اپدیت نشد");
        return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            message: "اپدیت انجام شد",
        });
    } catch (error) {
      next(error);
    }
  }
  async removeFaq(req, res, next){
    try {
        const { id } = req.params;
        await this.getOneFaq(id)
        const result = await CouresModel.updateOne(
            {"frequentlyAskedQuestions._id": id},
            {$pull : {frequentlyAskedQuestions: {_id: id}}}
        )
        if(!result) throw createError.InternalServerError("حذف سوال متداول موفقیت امیز نبود")
        return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            message: "حذف سوال متداول با موفقیت انجام شد"
        })
    } catch (error) {
        next(error)
    }
  }
  async findCourseById(courseID) {
    const { id } = await ObjectIdValidator.validateAsync({ id: courseID });
    const course = await CouresModel.findById(id);
    if (!course) throw createError.NotFound("دوره ای یافت نشد");
    return course;
  }
  async getOneFaq(id) {
    const faq = await CouresModel.findOne(
      { "frequentlyAskedQuestions._id": id },
      { "frequentlyAskedQuestions.$": 1 }
    );
    if (!faq) throw createError.NotFound("سوال متداول با این شناسه یافت نشد");
    return faq;
  }
}

module.exports = {
  FaqController: new FaqController(),
}
