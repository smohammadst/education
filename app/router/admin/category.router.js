const { CategoryController } = require("../../http/controller/admin/category.controller");
const router = require("express").Router();

router.post("/add", CategoryController.addCategory)
router.delete("/remove/:id", CategoryController.removeCategory)
router.patch("/edit/:id", CategoryController.editCategory)

module.exports = {
    AdminCategoryRouter: router
}
