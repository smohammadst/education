const createHttpError = require('http-errors');
const JWT = require('jsonwebtoken');
const { UserModel } = require('../../model/user.model');
const { StatusCodes } = require('http-status-codes');

function signJWT(userID) {
    return new Promise(async (resolve, reject) => {
        const phoneUser = await UserModel.findOne({ _id: userID });
        if (!phoneUser) reject(createHttpError.Unauthorized("وارد حساب کاربری خود شوید"));
        const paload = {
            phone: phoneUser.phone,
        };
        const option = {
            expiresIn: "1h",
        }
        JWT.sign(paload, process.env.ACCESS_TOKEN_SECRET_KEY, option, (err, token) => {
            if (err) {
                console.log("sign tiken error: " + err);
                reject(createHttpError[401]("=توکن منقضی شده است دوباره تلاش کنید"));
            }
            resolve(token)
        })
    })
}
async function verifyJWT(req, res, next) {
    try {
        console.log(req.headers['authorization']);
        if (!req.headers['authorization']) return next(createHttpError.Unauthorized("دوباره تلاش کنید"));
        const authorization = req.headers["authorization"];
        const token = authorization.split(" ")[1];
        // console.log(token);
        const verifyUser = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
        console.log(verifyUser);
        // console.log(verifyJWT);
        const user = await UserModel.findOne({ phone: verifyUser.phone })
        // console.log("user jwt : " + user);
        if (!user) return createHttpError.Unauthorized("کاربری یافت نشد");
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({
            StatusCode: 401
        })
    }
}
function SignRefreshToken(userId) {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId);
        const payload = {
            phone: user.phone,
        };
        const options = {
            expiresIn: "1y",
        };
        JWT.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY, options, async (err, token) => {
            if (err) reject(createError.InternalServerError("خطای سروری"));
            resolve(token);
        });
    });
}
function VerifyRefreshToken(token) {
    return new Promise((resolve, reject) => {
        JWT.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
            if (err)
                reject(createHttpError.Unauthorized("وارد حساب کاربری خود شوید"));
            const { phone } = payload || {};
            const user = await UserModel.findOne({ phone }, { password: 0, otp: 0 });
            if (!user) reject(createHttpError.Unauthorized("حساب کاربری یافت نشد"));
            resolve(phone);
        });
    });
}


module.exports = {
    signJWT,
    verifyJWT,
    VerifyRefreshToken,
    SignRefreshToken
}