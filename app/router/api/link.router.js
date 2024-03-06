const { linkController } = require('../../http/controller/api/link.controller');

const router = require('express').Router();

router.post('/add', linkController.addLink)

module.exports = {
    linkRouter: router
}