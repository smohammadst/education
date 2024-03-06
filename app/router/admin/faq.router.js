const { FaqController } = require("../../http/controller/admin/faq.controller");

const router = require("express").Router();

router.post("/add/:courseID", FaqController.addFaq)
router.patch("/edit/:id", FaqController.editFaq)
router.patch("/remove/:id", FaqController.removeFaq)


module.exports = {
    AdminFaqRouter: router
}