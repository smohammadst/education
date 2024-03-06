const { ApiBlogRouter } = require("./blog.router")
const { ApiBookRouter } = require("./book.router")
const { ApiCategoryRouter } = require("./category.router")
const { ApiChapterRouter } = require("./chapter.router")
const { ApiCommentRouter } = require("./comment.router")
const { ContactRouter } = require("./contactUs.router")
const { ApiCourseRouter } = require("./course.router")
const { ApiEpisodeRouter } = require("./episode.router")
const { ApiFaqRouter } = require("./faq.router")
const { FilterRouter } = require("./filter.router")
const { paymentRouter } = require("./payment.router")
const { userRouter } = require("./user.router")

const router = require("express").Router()
router.use("/book", ApiBookRouter)
router.use("/blog", ApiBlogRouter)
router.use("/category", ApiCategoryRouter)
router.use("/courses", ApiCourseRouter)
router.use("/comment", ApiCommentRouter)
router.use("/chapter", ApiChapterRouter)
router.use("/episode", ApiEpisodeRouter)
router.use("/faq", ApiFaqRouter)
router.use('/filter', FilterRouter)
router.use("/payment", paymentRouter)
router.use("/user", userRouter)
router.use("/contact", ContactRouter)



module.exports = {
    ApiRoute: router
}