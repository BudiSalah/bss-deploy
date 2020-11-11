const User = require("./../models/user.model")
const ReqError = require("./../controllers/error.controller")

exports.createPlayer = async (req, res) => {
    try {
        const newPlayer = await User.create({
            league_id: req.body.league_id,
            name: req.body.name
        })
        res.status(201).json(newPlayer)
    } catch (err) {
        res.status(400).json(new ReqError("User already exists!", err))
    }
}