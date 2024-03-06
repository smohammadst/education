const { FilterController } = require('../../http/controller/api/filter.controller');

const router = require('express').Router();

router.get("/:search/:query/:type", FilterController.filter)
router.get("/search", FilterController.search)

module.exports = {
    FilterRouter: router
}