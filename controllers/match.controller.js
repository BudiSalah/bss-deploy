const Match = require("../models/match.model")
const jwt = require("jsonwebtoken")

exports.allMatches = async (req, res) => {
    try {
        let token = req.cookies.jwt
        let league_id = jwt.verify(token, process.env.SECRET).leauge

        let allMatches = await Match.find({league_id}).sort({created_at: -1})

        res.status(200).json({
            status: "success",
            matches: allMatches
        })
    } catch (err) {
        res.status(400).json({
            status: "faild",
            message: "can't get all matches",
            error: err
        })
    }
}

exports.userMatches = async (req, res) => {
    try {
        let token = req.cookies.jwt
        let league_id = jwt.verify(token, process.env.SECRET).leauge
        let userId = req.params.id

        let userMatches = await Match.find({league_id, $or: [{"playerOne.id": userId}, {"playerTwo.id": userId}]}).sort({created_at: -1})

        if (userMatches.length === 0) throw new Error("no matches found!")

        res.status(200).json({
            status: "success",
            matches: userMatches
        })
    } catch (err) {
        res.status(400).json({
            status: "faild",
            message: "can't get all matches",
            error: err
        })
    }
}

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