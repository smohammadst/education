const createHttpError = require("http-errors");
const { UserModel } = require("../../../model/user.model");
const { signJWT, VerifyRefreshToken, SignRefreshToken } = require("../../middleware/JWT");
const { StatusCodes } = require("http-status-codes");
const MelipayamakApi = require('melipayamak');
const Controller = require("../controller");
const username = '0900000';
const password = '****';
const api = new MelipayamakApi(username, password);
class AuthController extends Controller {
    async checkUser(req, res, next) {
        try {
            const { phone } = req.body;
            const findUser = await UserModel.findOne({ phone });
            if (findUser) {
                const code = this.generateCode();
                await UserModel.updateOne({ phone }, { $set: { "otp.code": code } })
                this.sendSMS(phone, code)
                return res.status(StatusCodes.OK).json({ message: "کاربر یافت شد", StatusCode: StatusCodes.OK, code })
            }
            else {
                return res.status(StatusCodes.NOT_FOUND).json({ message: "کاربر یافت نشد", StatusCode: StatusCodes.NOT_FOUND })
            }
        } catch (error) {
            next(error)
        }
    }
    async register(req, res, next) {
        try {
            const { first_name, last_name, phone } = req.body;
            const findUser = await this.findUser(phone);
            if (findUser) throw createHttpError.Unauthorized("شما قبلا ثبت نام کرده ایید")
            const code = Math.floor(Math.random() * 100000);
            const otp = {
                code,
                expiresIn: new Date().getTime() + 120000
            }
            const creatUser = await UserModel.create({ first_name, last_name, phone, otp });
            if (!creatUser) throw createHttpError.InternalServerError("")
            this.sendSMS(phone, code);
            return res.status(StatusCodes.CREATED).json({
                StatusCode: StatusCodes.CREATED,
                message: "شما با موفقیت ثبت نام شدید",
            })
        } catch (error) {
            next(error)
        }
    }
    async loginForOtp(req, res, next) {
        try {
            const { code, phone } = req.body;
            let Role = "USER"
            const findUser = await this.findUser(phone);
            const validtionCode = await this.validtionCode(phone, code);
            if (validtionCode == false) throw createHttpError.Unauthorized("کد ارسال شده صحیح نمیباشد");
            const token = await signJWT(findUser._id);
            const refreshTOken = await SignRefreshToken(findUser._id);
            await findUser.updateOne({ $set: { token } });
            return res.status(StatusCodes.OK).json({
                StatusCode: StatusCodes.OK,
                token,
                refreshTOken,
                message: "ورود شما موفقیت آمیز بود",
                Role
            })
        } catch (error) {
            next(error)
        }
    }
    async refreshToken(req, res, next) {
        try {
            const { refreshtoken } = req.body;
            const verfiRefreshToken = await VerifyRefreshToken(refreshtoken);
            const findUser = await UserModel.findOne({ phone: verfiRefreshToken });
            const singToken = await signJWT(findUser._id);
            findUser.token = singToken;
            findUser.save();
            let Role = "USER"
            return res.status(StatusCodes.OK).json({
                singToken,
                Role
            })
        } catch (error) {
            next(error)
        }
    }
    async validtionCode(phone, code) {
        const findUser = await this.findUser(phone)
        if (!findUser) throw createHttpError.NotFound("کاربری یافت نشد");
        if (+code != +findUser.otp.code) return false
        return true
    }
    async findUser(phone) {
        const findUser = await UserModel.findOne({ phone })
        return findUser
    }
    async refreshCode(req, res, next) {
        try {
            const { phone } = req.body
            const code = this.generateCode();
            this.sendSMS(phone, code)
            return res.status(StatusCodes.OK).json({
                code,
                message: "کد ارسال شد"
            })
        } catch (error) {
            next(error)
        }
    }
    async sendSMS(phone, code) {
        const username = '09307886969';
        const password = 'FL2$Q';
        const api = new MelipayamakApi(username, password);
        const smsRest = api.sms()
        const to = "" + phone;
        const from = "**********";
        const text = `${code}`;
        // const bodyid = "کد ورود یکبار مصرف شما {0} میباشد"
        smsRest.sendByBaseNumber(text, to, 175205).then(e => {
            console.log(e)
        }).catch(err => {
            console.log("err" + err)
        })
    }
    generateCode() {
        return Math.floor(Math.random() * 10000)
    }
}
module.exports = {
    AuthController: new AuthController()
}

