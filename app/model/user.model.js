const { default: mongoose } = require('mongoose');
const monggose = require('mongoose');

const Address = new mongoose.Schema({
    codePostal: { type: String },
    address: { type: String }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
})

const UserSchema = new monggose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    phone: { type: String, required: true, uniqe: true },
    fixPhone: { type: String, default: 0 },
    email: { type: String, uniqe: true },
    image: { type: String },
    otp: { type: Object, default: { code: 0, expiresIn: 0 } },
    role: { type: String, default: "USER" },
    bills: { type: [], default: [] },
    codeDiscount: { type: String },
    likeProducts: { type: [monggose.Types.ObjectId] },
    bookmarkStor: { type: [monggose.Types.ObjectId] },
    productPurchased: { type: [mongoose.Types.ObjectId] },
    educationalVideoPurchased: { type: [mongoose.Types.ObjectId] },
    token: { type: String },
    address: { type: Address }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
module.exports = {
    UserModel: mongoose.model("user", UserSchema)
}