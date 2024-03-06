const { AuthController } = require('../../http/controller/auth/auth.controller');

const router = require('express').Router();

router.post("/checkuser", AuthController.checkUser);

router.post("/login", AuthController.loginForOtp);

router.post("/register", AuthController.register);

router.post('/refreshtoken' ,AuthController.refreshToken)

router.post("/refreshcode", AuthController.refreshCode)

module.exports = {
    AuthUser: router
}