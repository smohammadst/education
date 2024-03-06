const { ApiBlogController } = require("../../http/controller/api/blog.controller");

const router = require("express").Router();
router.get("/list", ApiBlogController.getAllBlog)
router.get("/getBlog/:id", ApiBlogController.getOneBlog)

module.exports = {
    ApiBlogRouter: router
}