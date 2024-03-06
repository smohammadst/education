const { ApiEpisodeController } = require("../../http/controller/api/episode.controller")
const router = require("express").Router()
router.get("/list/:chapterID", ApiEpisodeController.episodeOfChapter)

module.exports = {
    ApiEpisodeRouter: router
}