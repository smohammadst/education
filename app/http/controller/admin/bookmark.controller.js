
const Controller = require("../controller");
const { StatusCodes:HttpStatus} = require("http-status-codes");
const { CouresModel } = require("../../../model/course.model");

class BookmarkController extends Controller{
    async bookmarkCourse(req, res, next){
        const { courseID } = req.params;
        const user = req.user;
        let bookmarkCourse = await CouresModel.findOne({
            _id: courseID,
            bookmarks: user._id
        })
        const updateQuery = bookmarkCourse ? {$pull: {bookmarks: user._id}} : {$push: {bookmarks: user._id}}
        await CouresModel.updateOne({ _id: courseID }, updateQuery)
        let message;
        if(!bookmarkCourse){
            message = "دوره به لیست علاقه مندی ها اضافه شد"
        }else{
            message = "محصول از لیست علاقه مندی شما حذف شد"
        }
        return res.status(HttpStatus.CREATED).json({
            message
        })
    }
}

module.exports = {
    BookmarkController: new BookmarkController()
}