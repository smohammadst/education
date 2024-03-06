const { ApiCourseController } = require("../../http/controller/api/course.controller")
const router = require("express").Router()

router.get("/list", ApiCourseController.getAllCourse)
router.get("/getCourse/:id", ApiCourseController.getCourseById)

module.exports = {
    ApiCourseRouter: router
}