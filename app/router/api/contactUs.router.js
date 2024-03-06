const { ContactController } = require('../../http/controller/api/constactUs.controller');

const router = require('express').Router();

router.post("/add", ContactController.add);
router.get("/getAll", ContactController.getAll)
router.get("/sendStatus/:id", ContactController.status)

module.exports = {
    ContactRouter: router
}