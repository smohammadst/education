const router = require("express").Router();
const { CourseController } = require("../../http/controller/admin/course.controller");
const {upload}  = require("../../module/fileupload")

router.post("/add",CourseController.addCoure)
router.patch("/edit/:id",CourseController.editCourse)
router.delete("/remove/:id",CourseController.removeCourse)

module.exports = {
    AdminCourseRouter : router
}
