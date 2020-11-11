const router = require("express").Router()
const {createPlayer} = require("./../controllers/user.controller")
const {protect} = require("./../controllers/auth.controller")

router
    .route("/")
    .get((req, res) => {
        res.send("All Users!")
    })

router
    .route("/add-player")
    .post(protect, createPlayer)

module.exports = router