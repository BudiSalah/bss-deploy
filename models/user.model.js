const {Schema, model} = require("mongoose")

const userSchema = new Schema({
    league_id: {
        type: String,
        required: [true, "Missing league id!"]
    },
    name: {
        type: String,
        required: [true, "Misssing user name!"]
    },
    played: {
        type: Number,
        default: 0
    },
    won: {
        type: Number,
        default: 0
    },
    draw: {
        type: Number,
        default: 0
    },
    loss: {
        type: Number,
        default: 0
    },
    gf: {
        type: Number,
        default: 0
    },
    ga: {
        type: Number,
        default: 0
    },
    points: {
        type: Number,
        default: 0
    },
    last_f: {
        type: Array,
        default: ["-", "-", "-", "-", "-"]
    }
}, 
{
    timestamps: { createdAt: 'created_at' }
}
)

const User = model("User", userSchema)

module.exports = User