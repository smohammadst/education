const createError = require("http-errors");
const { CouresModel } = require("../../../model/course.model");
const Controller = require("../controller");
const { StatusCodes: HttpStatus } = require("http-status-codes");

class ApiEpisodeController extends Controller{
    async episodeOfChapter(req, res, next){
        try {
            const {chapterID} = req.params;
            const episodes = await this.getEpisodesOfChpater(chapterID)
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                episodes
            })
        } catch (error) {
            next(error)
        }
    }
    async getEpisodesOfChpater(chapterID){
        console.log(chapterID);
        const episodes = await CouresModel.findOne({"chapters.$[]._id": chapterID}, {
            "chapters.episodes":1
        })
        
        if(!episodes) throw createError.NotFound("این فصل ایپزود ندارد")
        return episodes
    }
}

module.exports = {
    ApiEpisodeController: new ApiEpisodeController()
}