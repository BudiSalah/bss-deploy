const router = require("express").Router()
const {loginUser} =  require("./../controllers/login-controller")

router
    .route("/")
    .get((req, res) => res.send("Login Page!"))
    .post(loginUser)

module.exports = router