const { BookmarkController } = require("../../http/controller/admin/bookmark.controller")
const router = require("express").Router()
router.patch("/addordelete/:courseID", BookmarkController.bookmarkCourse)
module.exports = {
    AdminBookmarkRouter: router
}