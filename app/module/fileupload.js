const multer = require("multer")
const moment = require("moment-jalaali")
const fs = require("fs")
const path = require("path")
const short = require('short-uuid');
const createHttpError = require("http-errors");
const createFolderWithDate = (folder) => {
    const year = moment().jYear();
    const month = moment().jMonth();
    const day = moment().jDate();
    return `./public/upload/${folder}/${year}/${month}/${day}/`;
}
const translator = short()
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const folder = req.originalUrl.indexOf("book") > 0 ? "book" : req.originalUrl.indexOf("course") > 0 ? "course" : "other"
        const path = createFolderWithDate(folder)
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true })
        }
        callback(null, path)
    },
    filename: (req, file, callback) => {
        const ext = path.extname(file.originalname)
        const filename = String(translator.generate()) + ext;
        callback(null, filename)

    }
})

function fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname);
    const mimetypes = [".jpg",".JPG", ".jpeg", ".png", ".webp", ".gif", ".jfif"];
    if (mimetypes.includes(ext)) {
        return cb(null, true);
    }
    return cb(createHttpError.BadRequest("فرمت ارسال شده تصویر صحیح نمیباشد"));
}

const upload = multer({ storage, fileFilter });
module.exports = {
    upload
}