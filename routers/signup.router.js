const router = require("express").Router()
const {signupUser} = require("./../controllers/signup.controller")

router
    .route("/")
    .post(signupUser)

module.exports = router