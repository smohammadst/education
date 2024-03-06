const { EventModl } = require("../../../model/event.model");
const Controller = require("../controller");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const createError = require("http-errors");
const { CouresModel } = require("../../../model/course.model");
const { BookModel } = require("../../../model/book.model");
const { createEventSchema } = require("../../validators/admin/event.schema");

class EventController extends Controller{
    async addEvent(req, res, next){
        try {
            console.log(req.body);
            let products = []
            //console.log(req.body);
            //const eventData = await createEventSchema.validateAsync(req.body)
            let {title, text, images, courses, books} = req.body;
            const originimage = images.map(e => e.slice(33, e.length))
            console.log("لاگ عکس ها");
            console.log(images);
            if(books == undefined & books == null) books = []
            //console.log(books);
            //console.log("لاگ دوره ها");
            // console.log(typeof courses);
            // const splitCourse = courses.split(",");
            //console.log(splitCourse);
            // const splitBooks = books.split(",")

            if(courses.length > 0){
                for (let i = 0; i < courses.length; i++) {
                    const x = await CouresModel.findOne({title: courses[i]})
                    products.push(x);
                }
            }
            if(books.length > 0){
                for (let j = 0; j < books.length; j++) {
                    const y = await BookModel.findOne({title: books[j]})
                    products.push(y);
                }
            }
<<<<<<< HEAD

            const event = await EventModl.create({title, text, images: originimage ,products})
=======
<<<<<<< HEAD

            const event = await EventModl.create({title, text, images: originimage ,products})
=======
            //const originimage = images.map(e => e.slice(33, e.length))
            const event = await EventModl.create({title, text, images,products})
>>>>>>> 908b1be31203b2d3e419099d1d538fab0f2dbd1f
>>>>>>> 80eeeabb4c65845b2545b2091dbd5058653e36e3
            if(!event) throw createError.InternalServerError("رویداد ثبت نشد")
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                message: "رویداد با موفقیت ثبت شد"
            })
        } catch (error) {
            next(error)
        }
    }
    async editEvent(req, res, next){
        try {
            const { id } = req.params;
            const event =  await EventModl.findOne({_id: id})
            if(!event) throw createError.NotFound("رویداد یافت نشد")
            let products= []
            const {title, text, courses, books, images} = req.body;
            const splitCourse = courses.split(",")
            const splitBooks = books.split(",")
            if(splitCourse.length > 1){
                for (let i = 0; i < splitCourse.length; i++) {
                    const x = await CouresModel.findOne({title: splitCourse[i]})
                    products.push(x);
                }
            }
            if(splitBooks.length > 1){
                for (let i = 0; i < splitBooks.length; i++) {
                    const y = await BookModel.findOne({title: books[i]})
                    products.push(y);
                }
            }
            const originimage = images.map(e => e.slice(33, e.length))
            const result = await EventModl.updateOne(
                {_id: event._id},
                {$set : {title, text, products, images: originimage}}
            )
            if(!result) throw createError.InternalServerError("رویداد اپدیت نشد")
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: "رویداد با موفقیت اپدیت شد"
            })
        } catch (error) {
            next(error)
        }
    }
    async removeEvent(req, res, next){
        const {id} = req.params;
        const result = await EventModl.deleteOne({_id: id})
        if(!result) throw createError.InternalServerError("حذف رویداد موفقیت امیز نبود")
        return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            message: "رویداد با موفقیت حذف شد"
        })
    }
    async getAll(req, res, next){
        const reslut = await EventModl.find({})
        return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            reslut
        })
    }
}


module.exports = {
    EventController : new EventController(),
}










