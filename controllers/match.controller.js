const Match = require("../models/match.model")

exports.updateMatch = async (req, res) => {
    try {
        const update = await Match.create({
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