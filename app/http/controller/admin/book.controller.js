const createError = require("http-errors");
const Controller = require("../controller");
const {
  createBookSchema,
} = require("../../validators/admin/book.schema");
const { BookModel } = require("../../../model/book.model");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const { CategoryModel } = require("../../../model/categories.model");


class BookController extends Controller {
  async addBook(req, res, next) {
    try {
      let finalPricePhysical = 0
      let finalPriceVirtual = 0
      // console.log(req.body);
      const bookBody = await createBookSchema.validateAsync(req.body);
      // console.log("بعد ولید");
      // console.log(bookBody);
      const {
        title, 
        urlTitle, 
        urlGoogle, 
        text, 
        short_text,  
        pricePhysical,
        priceVirtual, 
        discount,
        category,
        numberOfPages,
        yearOfPublication,
        link,
        images
      } = bookBody;
      const originimage = images.map(e => e.slice(33, e.length))
      const findCategory = await CategoryModel.findOne({category})
      if(!findCategory) throw createError.NotFound("ایدی ارسال شده دسته بندی اشتباه میباشد")
      if(discount > 0 && discount != 0){
        const add = (discount * pricePhysical) / 100
        finalPricePhysical = pricePhysical - add
      }else{
        finalPricePhysical = pricePhysical
      }

      if(discount > 0 && discount != 0){
        const add = (discount * priceVirtual) / 100
        finalPriceVirtual = priceVirtual - add
      }else{
        finalPriceVirtual = priceVirtual
      }
      const book = await BookModel.create({
        title,
        urlTitle,
        urlGoogle,
        text,
        short_text,
        images: originimage,
        pricePhysical: +pricePhysical,
        priceVirtual: +priceVirtual,
        discount: +discount,
        finalPricePhysical,
        finalPriceVirtual,
        numberOfPages: +numberOfPages,
        yearOfPublication,
        link,
        category
      });
      // console.log(book);
      if (!book) {
        throw createError.InternalServerError(
          "کتاب در دیتابیس ذخیره نشد"
        );
      }

      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: "ثبت کتاب با موفقیت انجام شد",
      });
    } catch (error) {
      // deleteFileInPublic(req.body.files);
      next(error);
    }
  }
  async removeBook(req, res, next){
    try {
      const {id} = req.params;
      const book = await this.findBook(id)
      const removeBook = await BookModel.deleteOne({_id: book._id})
      if(removeBook.deletedCount == 0) throw createError.InternalServerError("حذف کتاب انجام نشد")
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "کتاب با موفقیت حذف شد"
      })
    } catch (error) {
      next(error)
    }
  }
  async editBook(req, res, next){
    try {
      console.log(req.body);
      const data = await createBookSchema.validateAsync(req.body);
      const {
        title, 
        urlTitle, 
        urlGoogle, 
        text, 
        short_text,  
        pricePhysical,
        priceVirtual, 
        discount,
        numberOfPages,
        yearOfPublication,
        link,
        images,
        category
      } = data;
      console.log(data);

      const {id} = req.params;
      const book = await this.findBook(id)
      const findCategory = await CategoryModel.findOne({category :category})
      if(!findCategory) throw createError.NotFound("ایدی ارسال شده دسته بندی اشتباه میباشد")
      let finalPricePhysical = 0;
      if (pricePhysical) {
        if (discount != 0 && discount > 0) {
          const add = (pricePhysical * discount) / 100;
          finalPricePhysical = pricePhysical - add;
        } else {
          finalPricePhysical = pricePhysical;
        }
        finalPricePhysical = finalPricePhysical
      }

      let finalPriceVirtual = 0;
      if (priceVirtual) {
        if (discount != 0 && discount > 0) {
          const add = (priceVirtual * discount) / 100;
          finalPriceVirtual = priceVirtual - add;
        } else {
          finalPriceVirtual = priceVirtual;
        }
        finalPriceVirtual = finalPriceVirtual
      }

      const result = await BookModel.updateOne({ _id: book._id }, { $set:
          {
            title,
            urlTitle,
            urlGoogle,
            text,
            short_text,
            images,
            pricePhysical: +pricePhysical,
            priceVirtual: +priceVirtual,
            discount: +discount,
            finalPriceVirtual,
            finalPricePhysical,
            numberOfPages: +numberOfPages,
            yearOfPublication,
            link,
            category
          }
         })
      if (result.modifiedCount == 0) throw createError.InternalServerError("خطای داخلی")

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "اپدیت کتاب با موفقیت انجام شد"  
      })
    } catch (error) {
      next(error)
    }
  }
  async findBook(id) {
    const book = await BookModel.findById({_id: id})
    if(!book) throw createError.NotFound("کتابی با این شناسه پیدا نشد")
    return book
  }

}

module.exports = {
  BookController: new BookController(),
};
