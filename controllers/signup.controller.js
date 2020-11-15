const Login = require("./../models/login.model")
const bcrypt = require("bcrypt")
const uniqid = require("uniqid");

exports.signupUser = async (req, res) => {
    try {
        const {name, password} = req.body
        
        if (name == "" || password == "") throw new Error("Empty inputs! can't signup")

        const hash = bcrypt.hashSync(password, parseInt(process.env.SALT))
        const league_id = uniqid()

        const users = await Login.find({user: name})

        if (users.length > 0)
            throw new Error("User already exists")

        const newUser = await Login.create({
            user: name,
            password: hash,
            league_id
        })
    
        res.status(201).json({
            status: "success",
            message: "new user has been create"
        })
    } catch (err) {
        res.status(400).json({
            status: "faild",
            message: "can't create new user",
            user: err
        })
    }
}