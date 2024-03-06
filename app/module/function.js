const fs = require("fs")
const path = require("path");
const moment = require("moment-jalali");
const createHttpError = require("http-errors");

function deleteFileInPublic(fileAddress) {
    if (fileAddress) {
        const pathFile = path.join(__dirname, "..", "..", "public", fileAddress);
        if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
    }
}
function copyObject(object) {
    return JSON.parse(JSON.stringify(object));
}
function deleteInvalidPropertyInObject(data = {}, blackListFields = []) {
    let nullishData = ["", " ", "0", 0, null, undefined]
    Object.keys(data).forEach(key => {
        if (blackListFields.includes(key)) delete data[key]
        if (typeof data[key] == "string") data[key] = data[key].trim();
        if (Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim())
        if (Array.isArray(data[key]) && data[key].length == 0) delete data[key]
        if (nullishData.includes(data[key])) delete data[key];
    })
}

async function filter(model, query, search) {
    let result
    if (search != "null") {
        result = await model.find({
            $text: {
                $search: new RegExp(search, "ig")
            }
        })
    } else if (query == "null" && search == "null") {
        result = await model.find({});
    } else {
        switch (query) {
            case "new":
                result = await model.find({}).sort({ createAt: -1 });
                break
            case "view":
                result = await model.find({}).sort({ numberLink: -1 });
                break
            case "sale":
                result = await model.find({}).sort({ "sale": -1 });
                break
        }
    }
    console.log(result);
    return result
}

function checkRole(role) {
    return function (req, res, next) {
        const user = req.user;
        // console.log("user role " + user);
        if (user.role == role) return next();
        throw createHttpError.Forbidden("شما به این آدرس دسترسی ندارید");
    };
}

async function related(model, id) {
    let related = await model.find({});
    let relateds = []
    for (let i = 0; i < related.length; i++) {
        if (!(related[i]._id == id)) relateds.push(related[i])
    }
    return relateds
}

function invoiceNumberGenerator() {
    return (
        moment().format("jYYYYjMMjDDHHmmssSSS") +
        String(process.hrtime()[1]).padStart(9, 0)
    );
}

function discountCodeGenerator() {
    var coupon = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 6; i++) {
    coupon += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return coupon;
}

module.exports = {
    deleteFileInPublic,
    copyObject,
    deleteInvalidPropertyInObject,
    filter,
    checkRole,
    related,
    invoiceNumberGenerator,
    discountCodeGenerator
}
