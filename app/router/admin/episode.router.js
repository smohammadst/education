const { EpisodeController } = require("../../http/controller/admin/episode.controller");
const router = require("express").Router();

router.post("/add", EpisodeController.addEpisode)
router.patch("/edit/:episodeID", EpisodeController.editEpisode)
router.delete("/remove/:episodeID", EpisodeController.removeEpisode)

module.exports = {
    AdminEpisodeRouter: router
}