const router = require("express").Router()
const {allPlayers, createPlayer, updatePlayers} = require("./../controllers/user.controller")

router
    .route("/all-players")
    .get(allPlayers)

router
    .route("/add-player")
    .post(createPlayer)

router
    .route("/update-players")
    .post(updatePlayers)

module.exports = router