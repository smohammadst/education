const { SpotPlayerModel } = require("../model/spotplayer.model")
const { AdminRoute } = require("./admin/admin.routes")
const { ApiRoute } = require("./api/api.routes")
const { linkRouter } = require("./api/link.router")
const { AuthUser } = require("./auth/auth.router")

const router = require("express").Router()
router.use("/auth", AuthUser)
router.use("/api", ApiRoute)
router.use("/admin", AdminRoute)
router.use("/view", linkRouter)

router.get("/delete/otp", async (req, res, next) => {
    const data = await SpotPlayerModel.deleteMany({})
    return res.status(200).json({
        message:"همه حذف شد"
    })
})
module.exports = {
    AllRoutes: router
}