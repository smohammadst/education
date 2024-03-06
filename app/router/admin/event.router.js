const { EventController } = require("../../http/controller/admin/event.controller");


const router = require("express").Router();

router.post("/add", EventController.addEvent)
router.patch("/edit/:id", EventController.editEvent)
router.delete("/remove/:id", EventController.removeEvent)
router.get("/list", EventController.getAll)



module.exports = {
    AdminEventRouter: router
}