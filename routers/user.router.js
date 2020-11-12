const router = require("express").Router()
const {allPlayers, createPlayer} = require("./../controllers/user.controller")

router
    .route("/all-players")
    .get(allPlayers)

router
    .route("/add-player")
    .post(createPlayer)

module.exports = router