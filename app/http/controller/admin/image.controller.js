const createError = require("http-errors");
const { ImageModel } = require("../../../model/image.model");
const Controller = require("../controller");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const { isValidObjectId } = require("mongoose");
const mongoose = require('mongoose');
const { CouresModel } = require("../../../model/course.model");
class imageController extends Controller {
    async addImage(req, res, next) {
        try {

            let images = [];
            const fileField = req?.files || undefined
            // console.log(fileField);
            if (fileField.length > 0) images = fileField.map(file => file.destination.substr(8) + file.filename)
            const urlImage = images.map(image => "https://saberzarei.iran.liara.run" + image)
            // console.log(images);
            const result = await ImageModel.create({ images })
            if (!result) throw createError.InternalServerError("عکس اضافه نشد")
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                urlImage
            })
        } catch (error) {
            next(error)
        }
    }
    async removeImage(req, res, next) {
        try {
            const { id } = req.params;
            const image = await ImageModel.findOne({ _id: id })
            if (!image) throw createError.NotFound("ارایه عکس ها یافت نشد")
            const result = await ImageModel.deleteOne({ _id: id })
            if (!result) throw createError.InternalServerError("حذف موفقیت امیز نبود")
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: "حذف با موفقیت انجام شد"
            })
        } catch (error) {
            next(error)
        }

    }
    async editImage(req, res, next) {
        try {
            let images = [];
            const { id } = req.params;
            // console.log(id);
            // const x = await CouresModel.updateOne(
            //     {_id: id},
            //     {$pull : "images" },
            // )
            if(!x) throw createError.InternalServerError("dsfsaf")
            const fileField = req?.files || undefined
            if (fileField.length > 0) images = fileField.map(file => file.destination.substr(8) + file.filename)
            const urlImage = images.map(image => "https://saberzarei.iran.liara.run" + image)
            const result = await ImageModel.create({ images })
            if (!result) throw createError.InternalServerError("عکس اضافه نشد")
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                urlImage
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllImage(req, res, next) {
        try {
            const result = await ImageModel.find({})
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                result
            })
        } catch (error) {
            next(error)
        }

    }
}

module.exports = {
    imageController: new imageController()
}
