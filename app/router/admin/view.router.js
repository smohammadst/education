const router = require("express").Router();
const { ViewControllerAdmin } = require("../../http/controller/admin/view.controller");
const { verifyJWT } = require("../../http/middleware/JWT");
const { checkRole } = require("../../module/function");

router.post("/add", verifyJWT, checkRole("ADMIN"),ViewControllerAdmin.addView)
router.patch("/edit/:id", verifyJWT,checkRole("ADMIN"), ViewControllerAdmin.editView)
router.delete("/remove/:id", verifyJWT,checkRole("ADMIN"), ViewControllerAdmin.remove)
router.get("/getAllView", ViewControllerAdmin.getAllView)
module.exports = {
    AdminViewRouter: router
}

