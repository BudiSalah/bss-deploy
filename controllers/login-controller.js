const Login = require("./../models/login.model")
const bcrypt = require("bcrypt")
const ReqError = require("./../controllers/error.controller")
const {generateToken} = require("./auth.controller")

exports.loginUser = async (req, res) => {
    try {
        const {user, password} = req.body

        // check if user, and password is not empty
        if (!user || !password) {
            throw new Error("Empty request!")
        }

        // check if user is exists
        const userDb = await Login.findOne({user: user}).select("+password")
        const correctPass = bcrypt.compareSync(password, userDb.password)

        // check if id and password match db
        if (userDb.user !== user || !correctPass) {
            throw new Error("Wrong credential!")
        }

        // set cookie with jwt data
        let cookieData = {
            id: userDb._id,
            leauge: userDb.league_id
        }

        res.cookie("jwt", generateToken(cookieData), {
            httpOnly: true,
            // expires: new Date(Date.now() + 30000),
            // secure: true
        })

        res.status(200).json({
            status: "success",
            message: "Login and cookie are done!"
        })
    } catch(err) {
        res.status(401).json(new ReqError("Wrong id or password!", err.message))
    }
}

exports.logoutUser = async (req, res) => {
    try {
        res.cookie("jwt", undefined)

        res.status(200).json({
            status: "success",
            message: "user logged out"
        })
    } catch (err) {
        res.status(501).json({
            status: "faild",
            message: "error when trying to signout!"
        })
    }
}