const { StatusCodes } = require("http-status-codes")
const { BlogModel } = require("../../../model/blog.model")
const { BookModel } = require("../../../model/book.model")
const { CouresModel } = require("../../../model/course.model")
const { filter } = require("../../../module/function")

class FilterController {
    async filter(req, res, next) {
        try {
            const { search, query, type } = req.params
            console.log(`search: ${search}`);
            console.log(`query: ${query}`);
            console.log(`type: ${type}`);
            let result
            switch (type) {
                case "blog":
                    result = await filter(BlogModel, query, search)
                    break
                case "course":
                    result = await filter(CouresModel, query, search)
                    break
                case "book":
                    result = await filter(BookModel, query, search)
                    break
            }
            console.log(`result: ${result}`);
            return res.status(StatusCodes.OK).json({
                StatusCode: StatusCodes.OK,
                result
            })
        } catch (error) {
            next(error)
        }
    }
    async search(req, res, next) {
        try {
            const { search } = req?.query || '';
            let lists
            const listBlog = await BlogModel.find({ $text: { $search: new RegExp(search, "ig") } })
            const listCourse = await CouresModel.find({ $text: { $search: new RegExp(search, "ig") } })
            const listBook = await BookModel.find({ $text: { $search: new RegExp(search, "ig") } })
            lists = [...listBlog, ...listBook, ...listCourse]
            return res.status(StatusCodes.OK).json({
                lists,
                StatusCode: StatusCodes.OK
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    FilterController: new FilterController()
}
