const {Schema, model} = require("mongoose")

const loginSchema = new Schema({
    user: {
        type: String,
        require: [true, "Missing user id!"],
        unique: true
    },
    password: {
        type: String,
        require: [true, "Missing user password!"],
        select: false
    },
    role: {
        type: String,
        require: [true, "Missing user role!"],
        default: "admin"
    },
    league_id: {
        type: String,
        require: [true, "Missing user league id!"],
        unique: true
    }
},
{
    timestamps: { createdAt: 'created_at' }
}
)

const Login = model("Login", loginSchema)

module.exports = Login