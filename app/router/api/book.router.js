
const { ApiBookController } = require("../../http/controller/api/book.controller")
const router = require("express").Router()

router.get("/list", ApiBookController.getAllBook)
router.get("/getBook/:id", ApiBookController.getBookById)

module.exports = {
    ApiBookRouter: router
}