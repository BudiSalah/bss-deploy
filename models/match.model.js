const {Schema, model} = require("mongoose")

const matchSchema = new Schema({
    playerOne: {
        id: {
            type: String,
            require: [true, "missing player one id"]
        },
        name: {
            type: String,
            require: [true, "missing player one name"]
        },
        gf: {
            type: Number,
            require: [true, "missing player one gf"],
        },
        ga: {
            type: Number,
            require: [true, "missing player one ga"],
        },
        game_status: {
            type: String,
            require: [true, "missing player one game status"],
        }
    },
    playerTwo: {
        id: {
            type: String,
            require: [true, "missing player two id"]
        },
        name: {
            type: String,
            require: [true, "missing player two name"]
        },
        gf: {
            type: Number,
            require: [true, "missing player two gf"],
        },
        ga: {
            type: Number,
            require: [true, "missing player two ga"],
        },
        game_status: {
            type: String,
            require: [true, "missing player two game status"],
        }
    }
},
    {timestamps: { createdAt: 'created_at' }}
)

const Match = model("Match", matchSchema)

module.exports = Match