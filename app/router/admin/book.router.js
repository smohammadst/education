const { BookController } = require("../../http/controller/admin/book.controller")
const {upload}  = require("../../module/fileupload")
const router = require("express").Router()

router.post("/add", BookController.addBook)
router.patch("/edit/:id", BookController.editBook)
router.delete("/remove/:id", BookController.removeBook)


module.exports = {
    AdminBookRouter : router
}
