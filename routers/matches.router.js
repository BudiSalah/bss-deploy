const router = require("express").Router()
const {allMatches, userMatches, updateMatch} = require("./../controllers/match.controller")

router
    .route("/")
    .get(allMatches)

router
    .route("/:id")
    .get(userMatches)

router
    .route("/update")
    .post(updateMatch)

module.exports = router