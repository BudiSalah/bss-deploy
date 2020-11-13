const router = require("express").Router()
const {updateMatch} = require("./../controllers/match.controller")

router
    .route("/update")
    .post(updateMatch)

module.exports = router