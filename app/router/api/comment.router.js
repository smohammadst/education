const { BlogController } = require("../../http/controller/admin/blog.controller")
const { ApiBlogController } = require("../../http/controller/api/blog.controller")
const { ApiBookController } = require("../../http/controller/api/book.controller")
const { CommentContoller } = require("../../http/controller/api/comment.controller")
const { ApiCourseController } = require("../../http/controller/api/course.controller")
const { verifyJWT } = require("../../http/middleware/JWT")
const { checkRole } = require("../../module/function")

const router = require("express").Router()

router.post("/addCommentToBLog", verifyJWT, ApiBlogController.addCommentBlog)
router.post("/addCommentTocourse", verifyJWT, ApiCourseController.addComment)
router.post("/addCommentToBook", verifyJWT, ApiBookController.addComment)
router.post("/sendstatus", verifyJWT, checkRole("ADMIN"), CommentContoller.sendStatus);
router.delete("/remove", verifyJWT, checkRole("ADMIN"), CommentContoller.removeComment)
module.exports = {
    ApiCommentRouter: router
}
