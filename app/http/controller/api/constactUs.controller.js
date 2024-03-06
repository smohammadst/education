const { StatusCodes: HttpStatus } = require("http-status-codes");
const { ContactModel } = require("../../../model/contaxtUs.model");
const createHttpError = require("http-errors");
const MelipayamakApi = require("melipayamak");
const Controller = require("../controller");
class ContactController extends Controller {
    async add(req, res, next) {
        try {
            const { name, phone, text, subject, time } = req.body;
            if (text) {
                await ContactModel.create({ name, phone, text, subject, time });
                await this.sendAdviceSms(name, phone, time)
                return res.status(HttpStatus.OK).json({ StatusCode: HttpStatus.OK })
            }
            await ContactModel.create({ name, phone, time })
            await this.sendAdviceSms(name, phone, time)
            return res.status(HttpStatus.OK).json({ StatusCode: HttpStatus.OK })
        } catch (error) {
            next(error)
        }
    }
    async getAll(req, res, next) {
        try {
            const getAllContact = await ContactModel.find({});
            return res.status(HttpStatus.OK).json({
                StatusCode: HttpStatus.OK,
                getAllContact
            })
        } catch (error) {
            next(error)
        }
    }
    async status(req, res, next) {
        try {
            const { id } = req.params
            const result = await ContactModel.findOneAndUpdate({ _id: id }, { $set: { status: true } })
            if (result.modifiedCount == 0) throw createHttpError.InternalServerError("سرور با مشکل مواجه شدخ است دوباره تلاش کنید");
            await this.sendStatusSms(result.phone, result.name)
            return res.status(HttpStatus.OK).json({
                StatusCode: HttpStatus.OK,
            })
        } catch (error) {
            next(error)
        }
    }
    async sendAdviceSms(name, phone, time) {
        const username = '09307886969';
        const password = 'FL2$Q';
        const api = new MelipayamakApi(username, password);
        const smsRest = api.sms()
        const to = "09307886969";
        let hourRange;
        if(time == "morning"){
            hourRange = "9-12"
        }
        if(time == "after-noon"){
            hourRange = "12-15"
        }
        if(time == "evening"){
            hourRange = "15-18"
        }
        if(time == "night"){
            hourRange = "18-21"
        }
        const text = `${name};${phone};${hourRange}`
        smsRest.sendByBaseNumber(text, to, 176368).then(e => {
            console.log(e)
        }).catch(err => {
            console.log("err" + err)
        })
    }
    async sendStatusSms(phone, name) {
        const username = '09307886969';
        const password = 'FL2$Q';
        const api = new MelipayamakApi(username, password);
        const smsRest = api.sms()
        const to = "" + phone;
        const text = `${name}`
        smsRest.sendByBaseNumber(text, to, 176593).then(e => {
            console.log(e)
        }).catch(err => {
            console.log("err" + err)
        })
    }
}


module.exports = {
    ContactController: new ContactController()
}