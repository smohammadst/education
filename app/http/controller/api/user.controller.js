const createHttpError = require("http-errors");
const { UserModel } = require("../../../model/user.model");
const { StatusCodes } = require("http-status-codes");
const { SaleModel } = require("../../../model/sale.model");
const { CouresModel } = require("../../../model/course.model");
const { BookModel } = require("../../../model/book.model");
const { copyObject, deleteInvalidPropertyInObject } = require('../../../module/function');
const Controller = require("../controller");
const { SpotPlayerController } = require("./spotplayer.controller");
const { PaymentModel } = require("../../../model/payments");
const { SpotPlayerModel } = require("../../../model/spotplayer.model");

const blackListFields = {
    PHONE: "phone",
    FIRST_NAME: "first_name",
    LAST_NAME: "last_name",
    CITY: "city",
    CODEPOSTAL: "codePostal",
    PROVICE: "provice",
    FIXPHONE: "fixPhone"
}
Object.freeze(blackListFields)

class UserController extends Controller {
    async getProfileUSer(req, res, next) {
        try {
            const reqUser = req.user
            const findUser = await UserModel.findOne({ _id: reqUser._id });
            if (!findUser) throw createHttpError.NotFound("کاربری یافت نشد وارد حساب کاربری خود شوید");
            let user = copyObject(findUser);
            const sale = await SaleModel.find({ userID: reqUser._id })
            // //le.log(sale);
            let date
            let numberCourseOnline = 0;
            let numberCourseOfline = 0;
            let numberCourseInPersone = 0;
            let numberBook = 0
            let numberComment = 0
            let factor
            const book = await BookModel.find({ "comments.userID": reqUser._id });
            const course = await BookModel.find({ "comments.userID": reqUser._id });
            const blog = await BookModel.find({ "comments.userID": reqUser._id });
            let token
            book.forEach(e => {
                numberComment += e.comments.length
            })
            course.forEach(e => {
                numberComment += e.comments.length
            })
            blog.forEach(e => {
                numberComment += e.comments.length
            })
            if (sale) {
                for (var i = 0; i < sale.length; i++) {
                    const payment = await PaymentModel.findOne({ authority: sale[i].authority })
                    // //le.log(payment);
                    date = sale[i].createdAt
                    // factor = payment.invoiceNumber
                    // factor = 567890931
                    for (let x = 0; x < sale[i].bookID.length; x++) {
                        await BookModel.findOne({ _id: sale[i].bookID[x] })
                        numberBook += 1
                    }
                    for (let x = 0; x < sale[i].courseIDOnline.length; x++) {
                        await CouresModel.findOne({ _id: sale[i].courseIDOnline[x] })
                        numberCourseOnline += 1
                    }
                    for (let x = 0; x < sale[i].courseIDOffline.length; x++) {
                        await CouresModel.findOne({ _id: sale[i].courseIDOffline[x] })
                        numberCourseOfline += 1
                    }
                    for (let x = 0; x < sale[i].courseIDOInPerson.length; x++) {
                        await CouresModel.findOne({ _id: sale[i].courseIDOInPerson[x] })
                        numberCourseInPersone += 1
                    }
                }
                token = await SpotPlayerController.getTokenSpotPlayer(findUser._id, next)
            }
            user["lengthCourseOnline"] = numberCourseOnline;
            user["lengthCourseOfline"] = numberCourseOfline;
            user["lengthCourseInPerson"] = numberCourseInPersone;
            user["lengthBook"] = numberBook;
            user["lengthcomment"] = numberComment;
            // user["codeSpotPlayer"] = token;
            user["date"] = date
            // user['factor'] = factor
            return res.status(StatusCodes.OK).json({
                StatusCode: StatusCodes.OK,
                user
            })
        } catch (error) {
            next(error)
        }
    }
    async editProfileUser(req, res, next) {
        try {
            let data = copyObject(req.body);
            const userID = req.user._id;
            let blackListField = Object.values(blackListFields);
            deleteInvalidPropertyInObject(data, blackListField)
            const fineUser = await UserModel.updateOne({ _id: userID }, { $set: data });
            if (fineUser.modifiedCount == 0) throw createHttpError("سروربا مشکل موجه شده است دوباره تلاش کنید");
            return res.status(StatusCodes.OK).json({
                StatusCode: StatusCodes.OK,
                message: "پروفایل شما با موفقیت انجام شد"
            })

        } catch (error) {
            next(error)
        }
    }
    async getEducationalVideoPurchasedOnline(req, res, next) {
        try {
            const user = req.user;
            const { limit } = req.params
            const findSale = await SaleModel.find({ userID: user._id, verify: true });
            if (!findSale) return res.status(StatusCodes.OK).json({ educationalVideoOnline: [] })
            let list = [];
            findSale.forEach(e => {
                e.courseIDOnline.forEach(p => {
                    list.push({ id: p, date: e.createdAt })
                })
            })
            let educationalVideoOnline = await this.limit(CouresModel, limit, list, next)
            // console.log(`educationalVideoOffline:${educationalVideoOffline.tokenSP}`);
            return res.status(StatusCodes.OK).json({
                StatusCode: StatusCodes.OK,
                educationalVideoOnline
            })
        } catch (error) {
            next(error)
        }
    }
    async getEducationalVideoPurchasedOfline(req, res, next) {
        try {
            const user = req.user;
            const { limit } = req.params
            const findSale = await SaleModel.find({ userID: user._id, verify: true });
            if (!findSale) return res.status(StatusCodes.OK).json({ educationalVideoOffline: [] })
            let list = [];
            findSale.forEach(e => {
                e.courseIDOffline.forEach(p => {
                    list.push({ id: p, date: e.createdAt, authority: e.authority })
                })
            })
            console.log(list);
            let educationalVideoOffline = await this.limit(CouresModel, limit, list, next)
            console.log(`educationalVideoOffline:${educationalVideoOffline}`);
            return res.status(StatusCodes.OK).json({
                StatusCode: StatusCodes.OK,
                educationalVideoOffline
            })
        } catch (error) {
            next(error)
        }
    }
    async getEducationalVideoPurchasedInPerson(req, res, next) {
        try {
            const user = req.user;
            const { limit } = req.params
            const findSale = await SaleModel.find({ userID: user._id, verify: true });
            if (!findSale) return res.status(StatusCodes.OK).json({ educationalVideoInPerson: [] })
            let list = [];
            findSale.forEach(e => {
                e.courseIDOInPerson.forEach(p => {
                    list.push({ id: p, date: e.createdAt })
                })
            })
            // //le.log(list);
            let educationalVideoInPerson = await this.limit(CouresModel, limit, list, next)
            return res.status(StatusCodes.OK).json({
                StatusCode: StatusCodes.OK,
                educationalVideoInPerson
            })
        } catch (error) {
            next(error)
        }
    }
    async getBooktPurchased(req, res, next) {
        try {
            const user = req.user;
            const { limit } = req.params;
            const findSale = await SaleModel.find({ userID: user._id, verify: true });
            if (!findSale) return res.status(StatusCodes.OK).json({ educationalBook: [] })
            let list = []
            findSale.forEach(e => {
                e.bookID.forEach(p => {
                    list.push({ id: p, date: e.createdAt })
                })
            })
            let educationalBook = await this.limit(BookModel, limit, list, next)
            return res.status(StatusCodes.OK).json({
                StatusCode: StatusCodes.OK,
                educationalBook
            })
        } catch (error) {
            next(error)
        }
    }
    async limit(model, limit, property, next) {
        try {
            let products = []
            if (limit > 0) {
                for (var i = 0; i < property.length; i++) {
                    console.log(`id:${property[i].id}`);
                    let product = await model.findOne({ _id: property[i].id });
                    if (product) {
                        product = copyObject(product)
                        product["date"] = property[i].date || ""
                        product['authority'] = property[i].authority
                        if (product.item_type == "course") {
                            if (product.type == "offline") {
                                const token = await SpotPlayerModel.findOne({ authority: property[i].authority })
                                let tokenSP
                                token.spotPlayer.forEach(e => {
                                    if (e.courseID == product._id && token) {
                                        tokenSP = e.token
                                        console.log("tokensp: " + tokenSP);
                                    }else{
                                        tokenSP = ""
                                    }
                                })
                                if (token) product["tokenSP"] = tokenSP
                            }
                        }
                        products.push(product);
                    }
                    // console.log(`products11:${product}`);
                }
                // console.log(`products1:${products}`);

            } else if (limit == 0) {
                if (property.length <= 5) {
                    for (var i = 0; i < property.length; i++) {
                        let product = await model.findOne({ _id: property[i].id })
                        if (product) {
                            product = copyObject(product)
                            product["date"] = property[i].date || ""
                            product['authority'] = property[i].authority
                            if (product.item_type == "course") {
                                if (product.type == "offline") {
                                    const token = await SpotPlayerModel.findOne({ idSP: product.spotPlayerID })
                                    let tokenSP
                                    token.spotPlayer.forEach(e => {
                                        if (e.courseID == product._id) {
                                            tokenSP = e.token
                                            console.log(tokenSP);
                                        }else{
                                            tokenSP = ""
                                        }
                                    })
                                    if (token) product["tokenSP"] = tokenSP
                                }
                            }
                            products.push(product);
                        }
                    }
                    // console.log(`products2:${products}`);
                } else {
                    for (var i = 0; i < 5; i++) {
                        let product = await model.findOne({ _id: property[i].id })
                        if (product) {
                            product = copyObject(product)
                            product["date"] = property[i].date || ""
                            product['authority'] = property[i].authority
                            if (product.item_type == "course") {
                                if (product.type == "offline") {
                                    const token = await SpotPlayerModel.findOne({ idSP: product.spotPlayerID })
                                    let tokenSP
                                    token.spotPlayer.forEach(e => {
                                        if (e.courseID == product._id) {
                                            tokenSP = e.token
                                            console.log(tokenSP);
                                        }else{
                                            tokenSP = ""
                                        }
                                    })
                                    if (token) product["tokenSP"] = tokenSP
                                }
                            }
                            products.push(product);
                        }
                    }
                    // console.log(`products3:${products}`);
                }
            }
            console.log(`products4:${products}`);
            return products
        } catch (error) {
            next(error)
        }
    }
    async getAllUser(req, res, next) {
        try {
            const result = await UserModel.find({}, { first_name: 1, last_name: 1, phone: 1, email: 1 })
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                result

            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    UserController: new UserController()
}