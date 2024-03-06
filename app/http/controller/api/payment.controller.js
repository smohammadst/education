const { BookModel } = require("../../../model/book.model");
const { CouresModel } = require("../../../model/course.model");
const { SaleModel } = require("../../../model/sale.model");
const Controller = require("../controller");
const { default: axios } = require("axios");
const { invoiceNumberGenerator, copyObject } = require('../../../module/function');
const moment = require("moment-jalaali");
const { PaymentModel } = require("../../../model/payments");
const createHttpError = require("http-errors");
const HttpStatus = require('http-status-codes');
const { default: mongoose, disconnect } = require("mongoose");
const { UserModel } = require("../../../model/user.model");
const { DiscountCodeModel } = require("../../../model/discountCode.model");
const { SpotPlayerModel } = require("../../../model/spotplayer.model");
class PaymentControllerApi extends Controller {
    #user
    #amount
    #sale
    async PaymentGateway(req, res, next) {
        try {
            const { sendPrice, bascket, provice, city, address, code } = req.body;
            const user = req.user;
            let amount = 0;
            let sale;
            let objectProduct = []
            for (var i = 0; i < bascket.length; i++) {
                if (provice) {
                    sale = await SaleModel.create({
                        provice: provice,
                        city: city,
                        address: address,
                        userID: user._id
                    })
                } else {
                    sale = await SaleModel.create({
                        userID: user._id
                    })
                }
                if (bascket[i].item_type == "book") {
                    const product = await BookModel.findOne({ _id: bascket[i].id });
                    await SaleModel.updateOne({ _id: sale._id }, { $push: { bookID: product._id } });
                    objectProduct.push({ book_id: product._id, count: 1 })
                    amount += product.finalPricePhysical;
                } else if (bascket[i].item_type == "course") {
                    const product = await CouresModel.findOne({ _id: bascket[i].id });
                    if (product.type == "online")
                        await SaleModel.updateOne({ _id: sale._id }, { $push: { courseIDOnline: product._id } });
                    else if (product.type == "offline")
                        await SaleModel.updateOne({ _id: sale._id }, { $push: { courseIDOffline: product._id } });
                    else if (product.type == "inPerson")
                        await SaleModel.updateOne({ _id: sale._id }, { $push: { courseIDOInPerson: product._id } });
                    objectProduct.push({ course_id: product._id, count: 1 });
                    amount += product.finalPrice;
                }
            }
            await SaleModel.updateOne({ _id: sale._id }, { $set: { sale: objectProduct } })
            const discount = await DiscountCodeModel.findOne({ code });
            if (sendPrice) amount += +sendPrice
            this.#amount = amount * 10;
            if (discount)
                this.#amount = this.#amount - (this.#amount * discount.percent) / 100
            // console.log(amount);
            this.#sale = sale
            this.#user = user
            this.zarinPal(req, res, next)
        } catch (error) {
            next(error)
        }
    }
    async zarinPal(req, res, next) {
        try {
            const zarinpal_request_url =
                "https://api.zarinpal.com/pg/v4/payment/request.json";
            const zarinpalGatewayURL = "https://www.zarinpal.com/pg/StartPay";
            const description = "بابت خرید دوره یا محصولات";
            const zapripal_options = {
                merchant_id: process.env.ZARINPAL_MERCHANTID,
                amount: +this.#amount,
                description,
                metadata: {
                    email: this.#user?.email || "example@domain.com",
                    mobile: this.#user.phone,
                },
                callback_url: "https://saberzarei.iran.liara.run/api/payment/verify",
            };
            const RequestResult = await axios
                .post(zarinpal_request_url, zapripal_options)
                .then((result) => result.data);
            const { authority, code } = RequestResult.data;
            await SaleModel.updateOne(
                { _id: this.#sale._id },
                { $set: { authority } }
            );
            await PaymentModel.create({
                invoiceNumber: invoiceNumberGenerator(),
                paymentDate: moment().format("jYYYYjMMjDDHHmmss"),
                amount: +this.#amount,
                user: this.#user._id,
                description,
                authority,
                verify: false,
            });
            if (code == 100 && authority) {
                return res.status(HttpStatus.OK).json({
                    statusCode: HttpStatus.OK,
                    code,
                    gatewayURL: `${zarinpalGatewayURL}/${authority}`
                });
            }
        } catch (error) {
            next(error)
        }
    }
    async verifyPayment(req, res, next) {
        try {
            const { Authority: authority } = req.query;
            const verifyURL = "https://api.zarinpal.com/pg/v4/payment/verify.json";
            const payment = await PaymentModel.findOne({ authority });
            if (!payment)
                throw createHttpError.NotFound("تراکنش در انتظار پرداخت یافت نشد");
            if (payment.verify)
                throw createHttpError.BadRequest("تراکنش مورد نظر قبلا پرداخت شده");
            const verifyBody = JSON.stringify({
                authority,
                amount: payment.amount,
                merchant_id: process.env.ZARINPAL_MERCHANTID,
            });
            const verifyResult = await fetch(verifyURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: verifyBody,
            }).then((result) => result.json());
            if (verifyResult.data.code == 100) {
                await SaleModel.findOneAndUpdate(
                    { authority },
                    { $set: { verify: true } }
                );
                await PaymentModel.updateOne(
                    { authority },
                    {
                        $set: {
                            refID: verifyResult.data.ref_id,
                            cardHash: verifyResult.data.card_hash,
                            verify: true,
                        },
                    }
                );
                const result = await SaleModel.findOne({ authority });
                if (result.typeItem === "book" && result.typeItem === "course") {
                    if (result.typeItem === "book") await this.forUpdateProducr(result, BookModel, "bookID")
                    if (result.typeItem === "course") await this.forUpdateProducr(result, CouresModel, "courseID")
                }
                return res.redirect(`https://saberzarei.com/Basket/Order?orderId=${authority}`).json({
                    statusCode: HttpStatus.OK,
                    message: "پرداخت شما با موفقیت انجام شد",
                });
            }
            return res.redirect("https://saberzarei.com/Failed").json({
                massage: "پرداخت انجام نشد در صورت کسر وجه طی ۷۲ ساعت به حساب شما بازمیگردد"
            })
        } catch (error) {
            next(error);
        }
    }
    async forUpdateProducr(result, model, property) {
        for (var i = 0; i < result.sale.length; i++) {
            if (property == "bookID") {
                await model.updateOne(
                    { _id: result.sale[i]["bookID"] },
                    { $inc: { sale: 1 } }
                );
            } else if (property == "courseID") {
                await model.updateOne(
                    { _id: result.sale[i]["courseID"] },
                    { $inc: { sale: 1 } }
                );
            }
        }
    }
    async getAuthority(req, res, next) {
        try {
            const { authority } = req.params;
            const user = req.user
            const sale = await SaleModel.findOne({ authority });
            const payment = await PaymentModel.findOne({ authority })
            // if (!(sale.userID == user._id)) throw createHttpError.Forbidden("شما به این آدرس دسترسی ندارید");
            let courseIDOnline;
            let courseIDOffline;
            let courseIDOInPerson;
            let temp = []
            let book;
            let tokenSpotPlayer = []
            if (sale.courseIDOnline) {
                courseIDOnline = await this.getProducts(CouresModel, sale.courseIDOnline, next)
                if (!courseIDOnline) courseIDOnline = []
            } else {
                courseIDOnline = []
            }
            if (sale.courseIDOffline) {
                courseIDOffline = await this.getProducts(CouresModel, sale.courseIDOffline, next);
                for (let i = 0; i < courseIDOffline.length; i++) {
                    const e = courseIDOffline[i];
                    let course = await CouresModel.findOne({ _id: e });
                    course = copyObject(course)
                    const idSP = course.spotPlayerID;
                    const spotPlayer = await SpotPlayerModel.findOne({ authority })
                    let tokenSP
                    spotPlayer.spotPlayer.forEach(e => {
                        if (e.courseID == course._id) {
                            tokenSP = e.token
                        }
                    })
                    course["tokenSP"] = tokenSP
                    temp.push(course)
                }
                if (!courseIDOffline) courseIDOffline = []
            } else {
                courseIDOffline = []
            }
            if (sale.courseIDOInPerson) {
                courseIDOInPerson = await this.getProducts(CouresModel, sale.courseIDOInPerson, next)
                if (!courseIDOInPerson) courseIDOInPerson = []
            } else {
                courseIDOInPerson = []
            }
            if (sale.bookID) {
                book = await this.getProducts(BookModel, sale.bookID, next)
                if (!book) book = []
            } else {
                book = []
            }
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                courseIDOInPerson,
                courseIDOffline: temp,
                courseIDOnline,
                book,
                factor: payment.invoiceNumber,
                date: payment.createdAt,
                tokenSpotPlayer
            })
        } catch (error) {
            next(error)
        }
    }
    async getProducts(model, listProducts, next) {
        try {
            let products = []
            for (var i = 0; i < listProducts.length; i++) {
                const product = await model.findOne({ _id: mongoose.Types.ObjectId(listProducts[i]) })
                // console.log(`product : ${product}`);
                // console.log(typeof product);
                products.push(product)
            }
            return products
        } catch (error) {
            next(error)
        }
    }
    async getProductsPurched(req, res, next) {
        try {
            const sale = await SaleModel.find({ verify: true });
            let result = [];
            let courseIDOnline;
            let courseIDOffline;
            let courseIDOInPerson;
            let book;
            for (let i = 0; i < sale.length; i++) {
                const payment = await PaymentModel.findOne({ authority: sale[i].authority });
                const user = await UserModel.findOne({ _id: payment.user });
                if (sale[i].courseIDOnline) {
                    courseIDOnline = await this.getProducts(CouresModel, sale[i].courseIDOnline, next)
                    if (!courseIDOnline) courseIDOnline = []
                }
                if (sale[i].courseIDOffline) {
                    courseIDOffline = await this.getProducts(CouresModel, sale[i].courseIDOffline, next)
                    if (!courseIDOffline) courseIDOffline = []
                }
                if (sale[i].courseIDOInPerson) {
                    courseIDOInPerson = await this.getProducts(CouresModel, sale[i].courseIDOInPerson, next)
                    if (!courseIDOInPerson) courseIDOInPerson = []
                }
                if (sale[i].bookID) {
                    book = await this.getProducts(BookModel, sale[i].bookID, next)
                    if (!book) book = []
                }
                result.push({
                    courseIDOnline,
                    courseIDOffline,
                    courseIDOInPerson,
                    book,
                    user: {
                        first_name: user.first_name,
                        last_name: user.last_name,
                        phone: user.phone,
                        provice: sale[i].provice || "",
                        city: sale[i].city || "",
                        address: sale[i].address || ""
                    },
                    factor: payment.invoiceNumber,
                    date: payment.paymentDate,
                    amount: payment.amount
                })
            }
            return res.status(HttpStatus.StatusCodes.OK).json({
                result,
                StatusCode: HttpStatus.StatusCodes.OK
            })
        } catch (error) {
            next(error)
        }
    }
    async sendStatus(req, res, next) {
        try {
            const { id, status, trackingCode } = req.body;
            let sendStatusCode;
            if (status == "true")
                sendStatusCode = true;
            else sendStatusCode = false;
            // const username = '09307886969';
            // const password = 'FL2$Q';
            // const api = new MelipayamakApi(username, password);
            // const smsRest = api.sms()
            // const to = "" + phone;
            // const from = "50004001886969";
            // const text = `${trackingCode}`;
            // // const bodyid = "کد ورود یکبار مصرف شما {0} میباشد"
            // smsRest.sendByBaseNumber(text, to, 175205).then(e => {
            //     console.log(e)
            // }).catch(err => {
            //     console.log("err" + err)
            // })
            const sale = await SaleModel.updateOne({ id }, { $set: { sendStatusCode, trackingCode } });
            return res.status(HttpStatus.StatusCodes.OK).json({
                StatusCode: HttpStatus.StatusCodes.OK,
            })
        } catch (error) {
            next(error)
        }
    }
    async updateBascket(req, res, next) {
        try {
            const { listProducts } = req.body;
            let listUpdateProduct = [];
            for (let i = 0; i < listProducts.length; i++) {
                const course = await CouresModel.findOne({ _id: listProducts[i] });
                if (course) listUpdateProduct.push(course)
                const book = await BookModel.findOne({ _id: listProducts[i] });
                if (book) listUpdateProduct.push(book)
            }
            return res.status(200).json({
                StatusCode: 200,
                listUpdateProduct
            })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = {
    PaymentControllerApi: new PaymentControllerApi()
}