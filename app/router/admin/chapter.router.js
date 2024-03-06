const { ChapterController } = require("../../http/controller/admin/chapter.controller")

const router = require("express").Router()
router.post("/add", ChapterController.addChapter)
router.patch("/edit/:id", ChapterController.editChapter)
router.patch("/remove/:id", ChapterController.removeChapter)

module.exports = {
    AdminChapterRouter: router
}