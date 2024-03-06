
const axios = require("axios");
const { CouresModel } = require("../../../model/course.model");
const createHttpError = require("http-errors");
const { UserModel } = require("../../../model/user.model");
const { SpotPlayerModel } = require("../../../model/spotplayer.model");
class SpotPlayer {
    async postInformation(idCourse, userID, authority) {
        try {
            const spotplayer = await SpotPlayerModel.create({ user: userID });
            let responses = []
            let spotPlayerID
            for (let i = 0; i < idCourse.length; i++) {
                const id = idCourse[i];
                const course = await CouresModel.findOne({ _id: id });
                if (!course) throw createHttpError.NotFound("دوره ایی یافت نشد");
                const user = await UserModel.findOne({ _id: userID });
                console.log(user);
                let datas = JSON.stringify({
                    "course": [course.spotPlayerID],
                    "name": `${user.first_name} ${user.last_name}`,
                    "watermark": {
                        "texts": [
                            {
                                "text": user.phone
                            }
                        ]
                    }
                });
                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'https://panel.spotplayer.ir/license/edit/',
                    headers: {
                        '$API': process.env.API_SPOTPLAYER,
                        '$LEVEL': '-1',
                        'Content-Type': 'application/json'
                    },
                    data: datas
                };
                const { data } = await axios.request(config)
                responses.push({
                    token: data.key,
                    idSpotPlayer: data._id,
                    url: data.url,
                    courseID: course._id,
                    user: user._id
                })
                spotPlayerID = course.spotPlayerID
            }
            await SpotPlayerModel.updateOne({
                _id: spotplayer._id
            }, {
                $set: {
                    spotPlayer: responses,
                    idSP: spotPlayerID,
                    authority: authority
                }
            })
            // console.log(responses);
        } catch (error) {
            console.log(error);
        }
    }
    async getTokenSpotPlayer(userID, next) {
        try {
            const spotPlayer = await SpotPlayerModel.find({});
            let result = []
            for (let i = 0; i < spotPlayer.length; i++) {
                for (var x = 0; x < spotPlayer[i].spotPlayer.length; x++) {
                    const element = spotPlayer[i].spotPlayer[x];
                    if (element.user == userID) result.push({ token: element.token })
                }
            }
            // console.log("length: " + result.length)
            return result
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    SpotPlayerController: new SpotPlayer(),
};
