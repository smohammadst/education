const { UserController } = require('../../http/controller/api/user.controller');
const { verifyJWT } = require('../../http/middleware/JWT');
const { checkRole } = require('../../module/function');

const router = require('express').Router();

router.get("/getUser", verifyJWT, UserController.getProfileUSer);

router.patch("/editUser", verifyJWT, UserController.editProfileUser);

router.get("/getVideOnline/:limit", verifyJWT, UserController.getEducationalVideoPurchasedOnline);

router.get("/getVideOffline/:limit", verifyJWT, UserController.getEducationalVideoPurchasedOfline)

router.get("/getBook/:limit", verifyJWT, UserController.getBooktPurchased);

router.get("/getVideInPerson/:limit", verifyJWT, UserController.getEducationalVideoPurchasedInPerson)
router.get("/list", verifyJWT, UserController.getAllUser)

module.exports = {
    userRouter: router
}