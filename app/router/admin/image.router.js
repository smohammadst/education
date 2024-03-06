const {imageController} = require("../../http/controller/admin/image.controller");
const router = require("express").Router();
const {upload}  = require("../../module/fileupload")

router.post("/add", upload.array("images", 10) ,imageController.addImage)
router.patch("/edit/:id", upload.array("images", 10) ,imageController.editImage)
router.delete("/remove/:id", imageController.removeImage)
router.get("/list", imageController.getAllImage)

module.exports = {
    AdminImageRouter: router
}