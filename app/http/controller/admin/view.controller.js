const { StatusCodes } = require("http-status-codes");
const { ViewModl } = require("../../../model/view.model");
const createHttpError = require("http-errors");
const { copyObject } = require('../../../module/function');
const moment = require('moment-jalaali');
class ViewControllerAdmin {
    async addView(req, res, next) {
        try {
            const { nameUser, description, nameCourse } = req.body;
            const createView = await ViewModl.create({ nameCourse, nameUser, description });
            console.log(createView);
            if (!createView) throw createHttpError.InternalServerError("سرور با ارور مواجه شده است دوباره تلاش کنید")
            return res.status(StatusCodes.CREATED).json({
                StatusCode: StatusCodes.CREATED,
                message: 'دیدگاه با موفقیت ایچاد شد'
            })
        } catch (error) {
            next(error)
        }
    }
    async remove(req, res, next) {
        try {
            const { id } = req.params;
            const remove = await ViewModl.findOneAndRemove({ _id: id });
            return res.status(StatusCodes.OK).json({
                StatusCode: StatusCodes.OK,
                message: "دیدگاه با موفقیت حذف گردید"
            })
        } catch (error) {
            next(error)
        }
    }
    async editView(req, res, next) {
        try {
            const { nameUser, description, nameCourse } = req.body;
            const { id } = req.params;
            const findView = await ViewModl.updateOne({ _id: id }, { $set: { nameUser, nameCourse, description } })
            if (findView.modifiedCount == 0) throw createHttpError.InternalServerError("")
            return res.status(StatusCodes.OK).json({
                StatusCode: StatusCodes.OK
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllView(req, res, next) {
        try {
            const allViews = await ViewModl.find({});
            let allView = []
            for (let i = 0; i < allViews.length; i++) {
                let view = copyObject(allViews[i]);
                moment.locale('fa', { useGregorianParser: true });
                view.createdAt = moment(view.createdAt).format()
                allView.push(view)
            }
            console.log(allView);
            return res.status(StatusCodes.OK).json({
                allView,
                StatusCode: StatusCodes.OK
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    ViewControllerAdmin: new ViewControllerAdmin()
}