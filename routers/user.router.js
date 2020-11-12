const router = require("express").Router()
const {createPlayer} = require("./../controllers/user.controller")

router
    .route("/")
    .get((req, res) => {
        res.send("All Users!")
    })

router
    .route("/add-player")
    .post(createPlayer)

module.exports = router