const { AdminCategoryRouter } = require("./category.router")
const { AdminChapterRouter } = require("./chapter.router")
const { AdminCourseRouter } = require("./course.router")
const { AdminEpisodeRouter } = require("./episode.router")
const { AdminBookmarkRouter } = require("./bookmark.router")
const { AdminFaqRouter } = require("./faq.router")
const { AdminBookRouter } = require("./book.router")
const { AdminBlogRouter } = require("./blog.router")
const { AdminImageRouter } = require("./image.router")
const { checkRole } = require("../../module/function")
const { verifyJWT } = require("../../http/middleware/JWT")
const { AdminViewRouter } = require("./view.router")
const { AdminCodeRouter } = require("./discountCode.router")
const { AdminEventRouter } = require("./event.router")

const router = require("express").Router()
router.use("/image", verifyJWT, checkRole("ADMIN"), AdminImageRouter)
router.use("/book", verifyJWT, checkRole("ADMIN"), AdminBookRouter)
router.use("/blog", verifyJWT, checkRole("ADMIN"), AdminBlogRouter)
router.use("/courses", verifyJWT, checkRole("ADMIN"), AdminCourseRouter)
router.use("/category", verifyJWT, checkRole("ADMIN"), AdminCategoryRouter)
router.use("/chapter", verifyJWT, checkRole("ADMIN"), AdminChapterRouter)
router.use("/episode", verifyJWT, checkRole("ADMIN"), AdminEpisodeRouter)
router.use("/bookmark", verifyJWT, checkRole("ADMIN"), AdminBookmarkRouter)
router.use("/faq", verifyJWT, checkRole("ADMIN"), AdminFaqRouter)
router.use("/view", AdminViewRouter)
router.use("/code", AdminCodeRouter)
router.use("/event", AdminEventRouter)


module.exports = {
    AdminRoute: router
}