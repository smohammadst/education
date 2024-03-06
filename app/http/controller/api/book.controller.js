
const Controller = require("../controller");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const createError = require("http-errors");
const { BookModel } = require("../../../model/book.model");
const { CommentContoller } = require("./comment.controller");
const { copyObject, related } = require('../../../module/function');
class ApiBookController extends Controller {
    async getAllBook(req, res, next) {
        try {
            const { search } = req?.query || "";
            let books;
            if (search) {
                books = await BookModel.find({
                    $text: {
                        $search: new RegExp(search, "ig")
                    }
                })
            } else {
                books = await BookModel.find({})
            }

            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                books
            })
        } catch (error) {
            next(error)
        }
    }
    async searchFiveBook(req, res, next) {
        try {
            const books = await this.search(req)
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                books
            })
        } catch (error) {
            next(error)
        }

    }
    async getBookById(req, res, next) {
        try {
            const { id } = req.params
            let findbook = await BookModel.findOne({ _id: id }).populate({ path: "comments.user", select: "first_name last_name" })
            if (!findbook) throw createError.NotFound("کتاب یافت نشد")
            let book = copyObject(findbook);
            const relateds = related(BookModel, book._id);
            book["relateds"] = relateds
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                book
            })

        } catch (error) {
            next(error)
        }
    }

    async addComment(req, res, next) {
        await CommentContoller.addComment(req, res, next, BookModel);
    }
}

module.exports = {
    ApiBookController: new ApiBookController()
}