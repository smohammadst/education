const createError = require("http-errors");
const Controller = require("../controller");
const { CourseController } = require("./course.controller");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const { CouresModel } = require("../../../model/course.model");


class ChapterController extends Controller{
    async addChapter(req, res, next){
        try {
            const {id ,text, title, time, numberOfSessions} = req.body;
            const timeSeparator = time.split(":")
            const finalTime = {
                hour: timeSeparator[0],
                min: timeSeparator[1]
            }
            const course = await CouresModel.findOne({_id: id});
            if(!course) throw createError.NotFound("دوره یافت نشد")
            const result = await CouresModel.findOneAndUpdate(
                { _id: course._id },
                { $push: { chapters : { text, title, episodes: [], time: finalTime, numberOfSessions: +numberOfSessions}}}
            )
            if(!result) throw createError.InternalServerError("فصل اضافه نشد")
            const {chapters} =  await CouresModel.findOne({_id: id});
            const lastChapter = chapters[Object.keys(chapters)[Object.keys(chapters).length - 1]]
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                message: "فصل با موفقیت افزوده شد", 
                id: lastChapter._id
            })

        } catch (error) {
            next(error)
        }
    }
    async editChapter(req, res, next){
        try {
            const {id} = req.params;
            await this.getOneChapter(id)
            const {title, text, time, numberOfSessions} = req.body;
            const timeSeparator = time.split(":")
            const finalTime = {
                hour: timeSeparator[0],
                min: timeSeparator[1]
            }
            const result = await CouresModel.updateOne(
                { "chapters._id": id },
                { $set: { "chapters.$" : {title, text, time: finalTime, numberOfSessions} } }
            )
            if(!result) throw  createError.InternalServerError("بروز رسانی فصل انجام نشد") 
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: "ّبروز رسانی فصل با موفقیت انجام شد"
            })
        } catch (error) {
            next(error)
        }
    }
    async removeChapter(req, res, next){
        try {
            const {id} = req.params;
            await this.getOneChapter(id)
            const result = await CouresModel.updateOne(
                {"chapters._id": id},
                {$pull : {  chapters : { _id: id } } },
            )
            if(!result) throw createError.InternalServerError("حذف فصل انجام نشد")
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: "حذف فصل با موفقیت انجام شد"
            })
        } catch (error) {
            next(error)
        }
    }
    async getOneChapter(id){
        const chapter = await CouresModel.findOne({"chapters._id": id}, {"chapters.$": 1})
        if(!chapter) throw createError.NotFound("فصلی با این شناسه یافت نشد")
        return chapter

    }
}

module.exports = {
    ChapterController: new ChapterController()
}

