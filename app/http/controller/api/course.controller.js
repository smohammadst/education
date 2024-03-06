const Controller = require("../controller");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const createError = require("http-errors");
const { CouresModel } = require("../../../model/course.model");
const { CommentContoller } = require("../api/comment.controller");
const { related, copyObject } = require("../../../module/function");

class ApiCourseController extends Controller {
    async getAllCourse(req, res, next) {
        try {
            const { search } = req?.query || "";
            let courses;
            if (search) {
                courses = await CouresModel.find({
                    $text: {
                        $search: new RegExp(search, "ig")
                    }
                })
            } else {
                courses = await CouresModel.find({})
            }
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                courses
            })
        } catch (error) {
            next(error)
        }
    }
    async getCourseById(req, res, next) {
        try {
            const { id } = req.params;
            const findcourse = await CouresModel.findOne({ _id: id }).populate({ path: "comments.user", select: "first_name last_name" })
            if (!findcourse) throw createError.NotFound("دوره ای یافت نشد")
            let course = copyObject(findcourse)
            const relateds = await related(CouresModel, course._id);
            course["relateds"] = relateds
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                course
            })
        } catch (error) {
            next(error)
        }
    }
    async addComment(req, res, next) {
        await CommentContoller.addComment(req, res, next, CouresModel)
    }
}

module.exports = {
    ApiCourseController: new ApiCourseController()
}
