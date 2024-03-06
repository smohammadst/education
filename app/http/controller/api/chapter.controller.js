const createError = require("http-errors");
const { CouresModel } = require("../../../model/course.model");
const Controller = require("../controller");
const { StatusCodes: HttpStatus } = require("http-status-codes");

class ApiChapterController extends Controller{
    async chapterOfCourse(req, res, next){
        try {
            const {id} = req.params;
            const chapters = await this.getChapterOfCourse(id)
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                chapters
            })

        } catch (error) {
            next(error)
        }
    }
    async getChapterOfCourse(id){
        const chapters = await CouresModel.findOne({_id: id}, {chapters: 1, title: 1})
        if(!chapters) throw createError.NotFound("دوره ای با این شناسه یافت نشد")
        return chapters
    }
}

module.exports = {
    ApiChapterController: new ApiChapterController()
}
