const createError = require("http-errors");
const { CouresModel } = require("../../../model/course.model");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const Controller = require("../controller");
const { ObjectIdValidator } = require("../../validators/public.schema");

class ApiFaqController extends Controller {
    async getAllFaq(req, res, next){
        try {
            const {courseID} = req.params;
            await this.findCourseById(courseID)
            const result = await CouresModel.findOne({_id: courseID}, {"frequentlyAskedQuestions": 1, _id: 0})
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                frequentlyAskedQuestions: result.frequentlyAskedQuestions
            })
        } catch (error) {
            next(error)
        }
    }
    async findCourseById(courseID){
        const {id} = await ObjectIdValidator.validateAsync({id: courseID})
        const course = await CouresModel.findById(id)
        if(!course) throw createError.NotFound("دوره ای یافت نشد")
        return course
    }
}

module.exports = {
    ApiFaqController: new ApiFaqController()
}