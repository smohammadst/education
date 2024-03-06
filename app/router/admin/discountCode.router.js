const { DiscountCode } = require("../../http/controller/admin/discountCode.controller")
const router = require("express").Router()
router.post("/add", DiscountCode.addCode)
router.delete("/remove/:id", DiscountCode.removeCode)
router.get("/list", DiscountCode.getListCode)
router.post("/check", DiscountCode.check)
module.exports = {
    AdminCodeRouter: router
}
