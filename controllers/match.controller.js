const Match = require("../models/match.model")
const jwt = require("jsonwebtoken")

exports.updateMatch = async (req, res) => {
    try {
        let token = req.cookies.jwt
        let league_id = jwt.verify(token, process.env.SECRET).leauge

        const update = await Match.create({
            league_id,
            playerOne: req.body.playerOne,
            playerTwo: req.body.playerTwo
        })
        res.status(201).json({
            status: "success",
            message: "new match created",
            match: update
        })
    } catch (err) {
        res.status(401).json({
            status: "faild",
            message: "match didn't created",
            error: err
        })
    }
}