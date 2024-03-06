const { PaymentControllerApi } = require('../../http/controller/api/payment.controller');
const { verifyJWT } = require('../../http/middleware/JWT');
const { checkRole } = require('../../module/function');

const router = require('express').Router();

router.post("/zarinpal", verifyJWT, PaymentControllerApi.PaymentGateway);

router.get("/verify", PaymentControllerApi.verifyPayment);

router.get("/getAuthority/:authority", verifyJWT, PaymentControllerApi.getAuthority);

router.get("/getSale", verifyJWT, checkRole("ADMIN"), PaymentControllerApi.getProductsPurched);

router.post("/updateBascket", verifyJWT,PaymentControllerApi.updateBascket);

module.exports = {
    paymentRouter: router
}