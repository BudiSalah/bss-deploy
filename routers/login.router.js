const router = require("express").Router()
const {loginUser, loginOutUser} =  require("./../controllers/login-controller")

router
    .route("/")
    .post(loginUser)

module.exports = router