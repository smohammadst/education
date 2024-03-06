const { ApiControllerCategory } = require("../../http/controller/api/category.controller")

const router = require("express").Router()
router.get("/all", ApiControllerCategory.getAllCategory)
router.get("/getCategory/:title", ApiControllerCategory.getCategoryByTitle)

module.exports = {
    ApiCategoryRouter: router
}
