const { default: mongoose } = require("mongoose");
const Controller = require("../controller");
const createError = require("http-errors");
const { StatusCodes: HttpStatus, StatusCodes } = require("http-status-codes");
const { BookModel } = require("../../../model/book.model");
const { BlogModel } = require("../../../model/blog.model");
const { CouresModel } = require("../../../model/course.model");
// const courseModel = require("../../../model/course.model");

class CommentContoller extends Controller {
    async addComment(req, res, next, Model) {
        try {
            const { comment, parent, id } = req.body;
            if (!mongoose.isValidObjectId(id)) throw createError.BadGateway("شناسه ارسال شده صحیح نمیباشد")
            const userID = req.user._id
            if (parent && mongoose.isValidObjectId(parent)) {
                const resultComment = await Model.updateOne(
                    {
                        _id: id,
                        "comments._id": mongoose.Types.ObjectId(parent)
                    },
                    {
                        $push: {
                            "comments.$.answers": {
                                comment,
                                user: userID
                            }
                        }
                    }
                )
                if (!resultComment) throw createError.InternalServerError("پاسخ شما ثبت نشد")
                return res.status(HttpStatus.CREATED).json({
                    statusCode: HttpStatus.CREATED,
                    message: "پاسخ شما با موفقیت ثبت شد"
                })
            } else {
                const resultComment = await Model.updateOne(
                    { _id: id },
                    {
                        $push: {
                            comments: {
                                comment,
                                user: userID,
                            }
                        }
                    }
                )
                if (resultComment.modifiedCount == 0) throw createError.InternalServerError("کامنت شما ثبت نشد")
                return res.status(HttpStatus.CREATED).json({
                    statusCode: HttpStatus.CREATED,
                    message: "کامنت شما با موفقیت ثبت شد"
                })
            }
        } catch (error) {
            next(error)
        }
    }
    async sendStatus(req, res, next) {
        try {
            const { id, type, status } = req.body;
            let comment
            let answer
            let typeStatuse
            if (status == "true") typeStatuse = true
            else typeStatuse = false
            switch (type) {
                case "blog":
                    comment = await BlogModel.updateOne({ "comments._id": id }, { $set: { "comments.$.show": typeStatuse, "comments.$.isShowAdmin": true } })
                    if (!comment)
                        answer = await BlogModel.updateOne({ "comments.answer._id": id }, { $set: { " comments.$.answer.$.show": typeStatuse, "comments.$.answer.$.isShowAdmin": true } })
                    break
                case "book":
                    comment = await BookModel.updateOne({ "comments._id": id }, { $set: { "comments.$.show": typeStatuse, "comments.$.isShowAdmin": true } })
                    if (!comment)
                        answer = await BookModel.updateOne({ "comments.answer._id": id }, { $set: { " comments.$.answer.show": typeStatuse, "comments.$.answer.$.isShowAdmin": true } })
                    break
                case "course":
                    comment = await CouresModel.updateOne({ "comments._id": id }, { $set: { "comments.$.show": typeStatuse, "comments.$.isShowAdmin": true } })
                    if (!comment) {
                        answer = await CouresModel.updateOne({ "comments.answer._id": id }, { $set: { "comments.$.answer.$.show": typeStatuse, "comments.$.answer.$.isShowAdmin": true } })
                    }
                    break
            }
            return res.status(HttpStatus.OK).json({
                StatusCodes: HttpStatus.OK,
                message: `با موفقیت انجام شد`
            })

        } catch (error) {
            next(error)
        }
    }
    async removeComment(req, res, next) {
        try {
            const { id, type } = req.body;
            let typeModel
            switch (type) {
                case "blog":
                    typeModel = await BlogModel.findOneAndDelete({ "comment": id, "comment.answer._id": id },)
                    break
                case "book":
                    typeModel = await BookModel.findOneAndDelete({ "comment._id": id, "comment.answer._id": id },)
                    break
                case "course":
                    typeModel = await CouresModel.findOneAndDelete({ "comment._id": id, "comment.answer._id": id },)
                    break
            }
            return res.status(StatusCodes.OK).json({
                message: "کامنت با موفقیت حذف گردید",
                StatusCode: StatusCodes.OK
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    CommentContoller: new CommentContoller()
}