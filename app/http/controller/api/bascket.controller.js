class BascketCOntrollerAPI {
    async Addbascket(req, res, next) {
        try {
            const { bascket, sendPrice } = req.body;
            const userID = req.user;
            if (sendPrice) {
                for (var i = 0; i < bascket.length; i++) {
                    const city = bascket[i].city;
                    const provice = bascket[i].provice;
                }
            } else {

            }

        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    BascketCOntrollerAPI: new BascketCOntrollerAPI()
}