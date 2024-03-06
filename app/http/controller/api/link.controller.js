const { BlogModel } = require("../../../model/blog.model");
const { BookModel } = require("../../../model/book.model");
const { CouresModel } = require("../../../model/course.model");
const { StatusCodes } = require("http-status-codes");
const Controller = require("../controller");
const { linkModel } = require("../../../model/link.model");

class linkController extends Controller {
    async addLink(req, res, next) {
        try {
            const { type, id, ip } = req.body;
            switch (type) {
                case "book":
                    await this.updateModel(res, BookModel, id, ip)
                    break;
                case "course":
                    await this.updateModel(res, CouresModel, id, ip)
                    break;
                case "blog":
                    await this.updateModel(res, BlogModel, id, ip)
                    break;
            }
        } catch (error) {
            next(error)
        }
    }
    async updateModel(res, model, id, ip) {
        const ips = await linkModel.find({});
        for (let i = 0; i < ips.length; i++) {
            const element = ips[i].ip;
            if (ip == element)
                throw res.status(StatusCodes.CONFLICT).json({ StatusCode: StatusCodes.CONFLICT });
        }
        await linkModel.create({ ip });
        const result = await model.updateOne({ _id: id }, { $inc: { "numberLink": 1 } });
        if (result.modifiedCount == 0) throw res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ StatusCode: StatusCodes.INTERNAL_SERVER_ERROR })
        return res.status(StatusCodes.OK).json({ StatusCode: StatusCodes.OK })
    }
}

module.exports = {
    linkController: new linkController()
}