const User = require("./../models/user.model")
const ReqError = require("./../controllers/error.controller")
const jwt = require("jsonwebtoken")

exports.allPlayers = async (req, res) => {
    try {
        let token = req.cookies.jwt
        if (token == undefined) throw new Error("Token not exists!")
        let league_id = jwt.verify(token, process.env.SECRET).leauge
        let allPlayers = await User.find({ league_id }).sort({ name: 1 })

        res.status(200).json({
            status: "success",
            message: "all users fetch has went successfully",
            allPlayers
        })
    } catch (err) {
        res.status(401).json({
            status: "faild",
            message: "can't fetch all players",
            error: err
        })
    }
}

exports.createPlayer = async (req, res) => {
    try {
        const newPlayer = await User.create({
            league_id: req.body.league_id,
            name: req.body.name
        })
        res.status(201).json({
            status: "success",
            message: "new player has been created",
            newPlayer
        })
    } catch (err) {
        res.status(400).json(new ReqError("User already exists!", err))
    }
}

exports.updatePlayers = async (req, res) => {
    try {
        const { playerOne, playerTwo } = req.body
        const updatePlayerOne = await User.updateOne({ name: playerOne.name }, {
            $inc: {
                "played": 1,
                "gf": playerOne.gf,
                "ga": playerOne.ga,
                [playerOne.game_status]: 1,
                "points": playerOne.points
            }
        })

        const updatePlayerTwo = await User.updateOne({ name: playerTwo.name }, {
            $inc: {
                "played": 1,
                "gf": playerTwo.gf,
                "ga": playerTwo.ga,
                [playerTwo.game_status]: 1,
                "points": playerTwo.points
            }
        })

        res.status(201).json({
            status: "success",
            message: "new player has been created",
            updated: {
                updatePlayerOne,
                updatePlayerTwo
            }
        })
    } catch (err) {
        res.status(400).json(new ReqError("can't update player!", err))
    }
}