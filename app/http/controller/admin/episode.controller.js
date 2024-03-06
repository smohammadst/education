const createError = require("http-errors");
const { CouresModel } = require("../../../model/course.model");
const { createEpisodeSchema } = require("../../validators/admin/course.schema");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const Controller = require("../controller");
const { copyObject } = require("../../../module/function");
const { ObjectIdValidator } = require("../../validators/public.schema");


class EpisodeController extends Controller {
  async addEpisode(req, res, next) {
    try {
      const { title, text, time, chapterID, courseID } =
        await createEpisodeSchema.validateAsync(req.body);
      const episode = {
        title,
        text,
        time,
      };
      const result = await CouresModel.updateOne(
        {
          _id: courseID,
          "chapters._id": chapterID,
        },
        {
          $push: {
            "chapters.$.episodes": episode,
          },
        }
      );
      if (!result)
        throw createError.InternalServerError("افزودن اپیزود انجام نشد");
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: "افزودن اپیزود با موفقیت انجام شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async editEpisode(req, res, next) {
    try {
      const { episodeID,  chapterID} = req.body;
      const episode = await this.getOneEpisodeForEdit(episodeID);
      // console.log(episode);
      const data = req.body;

      const newEpisode = {
        ...episode,
        ...data,
      };
      const editEpisodeResult = await CouresModel.updateOne(
        {
            "chapters.episodes": {
                $elemMatch: {
                    "episode._id": episodeID
                }
            }
        },
        {$set: {"chapters.$[chapter].episodes.$[episode]": newEpisode}},
        {
            arrayFilters: [
               { "chapter._id":chapterID},
               { "episode._id": episodeID},
            ]
        }
    );
      if (!editEpisodeResult)
        throw createError.InternalServerError("ویرایش اپیزود انجام نشد");
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "ویرایش اپیزود با موفقیت انجام شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async removeEpisode(req, res, next) {
    try {
      const { id: episodeID } = await ObjectIdValidator.validateAsync({
        id: req.params.episodeID,
      });
      const episode = await this.getOneEpisodeForRemove(episodeID);
      const result = await CouresModel.updateOne(
        {
          "chapters.episodes._id": episodeID,
        },
        {
          $pull: {
            "chapters.$.episodes": {
              _id: episodeID,
            },
          },
        }
      );
      if (!result)
        throw createError.InternalServerError("اپیزود با موفقیت حذف نشد");
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "حذف اپیزود با موفقیت انجام شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async getOneEpisodeForEdit(episodeID) {
    const course = await CouresModel.findOne({
      "chapters.episodes._id": episodeID,
    }, {"chapters.$": 1});
    if (!course) throw createError.NotFound("اپیزودی یافت نشد");
    return copyObject(course);
  }
  async getOneEpisodeForRemove(episodeID){
    const course = await CouresModel.findOne({"chapters.episodes._id": episodeID}, {
        "chapters.episodes": 1
    })
    if(!course) throw new createError.NotFound("اپیزودی یافت نشد")
    const episode = await course?.chapters?.[0]?.episodes?.[0]
    if(!episode) throw new createError.NotFound("اپیزودی یافت نشد")
    return copyObject(episode)
} 
}

module.exports = {
  EpisodeController: new EpisodeController(),
};
