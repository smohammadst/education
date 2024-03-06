const { ApiChapterController } = require("../../http/controller/api/chapter.controller")

const router = require("express").Router()
router.get("/list/:id", ApiChapterController.chapterOfCourse)

module.exports = {
    ApiChapterRouter: router
}