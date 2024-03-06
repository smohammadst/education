const createError = require("http-errors");
const { BlogModel } = require("../../../model/blog.model");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const { CategoryModel } = require("../../../model/categories.model");
const { createBlogSchema } = require("../../validators/admin/blog.schema");
const { ObjectIdValidator } = require("../../validators/public.schema");
const Controller = require("../controller");
const blogModel = require("../../../model/blog.model");

class BlogController extends Controller {
  async addBLog(req, res, next) {
    try {

      const blogDataBody = await createBlogSchema.validateAsync(req.body);
      const { title, urlTitle, urlGoogle, short_text, text, status, category, images } = blogDataBody;
      console.log(images);
      const originimage = images.map(e => e.slice(33, e.length))
      const findCategory = await CategoryModel.findOne({ category });
      if (!findCategory)
        throw createError.NotFound("ایدی ارسال شده دسته بندی اشتباه میباشد");
      const create = await BlogModel.create({
        title,
        urlTitle,
        urlGoogle,
        short_text,
        text,
        category,
        status,
        images: originimage,
      });
      if (!create)
        throw createError.InternalServerError("بلاگ با موفقیت افزوده نشد");
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: "بلاگ با موفقیت ساخته شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async removeBlog(req, res, next) {
    try {
      const { blogID } = req.params;
      await this.findBlog(blogID);
      const removeBlog = await BlogModel.deleteOne({ _id: blogID });
      if (removeBlog.deletedCount == 0)
        throw createError.InternalServerError("بلاگ یافت نشد");
      return res.status(HttpStatus.OK).json({
        message: "بلاگ با موفقیت حذف گردید",
        StatusCode: HttpStatus.OK,
      });
    } catch (error) {
      next(error);
    }
  }
  async editBlog(req, res, next) {
    try {
      const { blogID } = req.params;
      const data = await createBlogSchema.validateAsync(req.body);
      await this.findBlog(blogID);
      const findCategory = await CategoryModel.findOne({
        category: data.category,
      });
      if (!findCategory)
        throw createError.NotFound("ایدی ارسال شده دسته بندی اشتباه میباشد");
      const result = await BlogModel.updateOne({ _id: blogID }, { $set: data });
      if (result.modifiedCount == 0)
        throw createError.InternalServerError("بلاگ اپدیت نشد");
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "بلاگ با موفقیت اپدیت شد",
      });
    } catch (error) {
      next(error);
    }
  }

  async findBlog(blogID) {
    const { id } = await ObjectIdValidator.validateAsync({ id: blogID });
    const blog = await BlogModel.findOne({ _id: id });
    if (!blog) throw createError.NotFound("بلاگی با این شناسه پیدا نشد");
    return blog;
  }
  async sortBlog(req, res, next){
    try {
      const {id, sortByNumber} = req.body;
      const result = await BlogModel.updateOne({_id: id}, {$set: {sortByNumber: +sortByNumber} })
      if(!result) throw createError.InternalServerError("عدد برای  مرتب کردن اضافه نشد")
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "با موفقیت اضافه شد"
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = {
  BlogController: new BlogController()
};
