const { StatusCodes: HttpStatus } = require("http-status-codes");
const { BlogModel } = require("../../../model/blog.model");
const createHttpError = require("http-errors");
const { CommentContoller } = require("./comment.controller");
const { related, copyObject } = require("../../../module/function");

class BlogControllerApi {
    async getAllBlog(req, res, next) {
        try {
            const { search } = req?.query || "";
            let blogs;
            if (search) {
                blogs = await BlogModel.find({
                    $text: {
                        $search: new RegExp(search, "ig")
                    }
                })
            } else {
                blogs = await BlogModel.find({}).sort({ "sortByNumber": 1 })
            }
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                blogs
            })
        } catch (error) {
            next(error)
        }
    }
    async getOneBlog(req, res, next) {
        try {
            const { id } = req.params;
            const findblog = await BlogModel.findOne({ _id: id }).populate({ path: "comments.user", select: "first_name last_name" });
            if (!findblog) throw createHttpError.NotFound("مقاله ی مورد نیاز پیدا نشد");
            let blog = copyObject(findblog)
            const relateds = await related(BlogModel, blog._id);
            blog["relateds"] = relateds
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                blog
            })
        } catch (error) {
            next(error)
        }
    }
    async addCommentBlog(req, res, next) {
        await CommentContoller.addComment(req, res, next, BlogModel);
    }

}

module.exports = {
    ApiBlogController: new BlogControllerApi()
}