
const { ApiFaqController } = require("../../http/controller/api/faq.controller")
const router = require("express").Router()
router.get("/list/:courseID", ApiFaqController.getAllFaq)

module.exports = {
    ApiFaqRouter: router
}