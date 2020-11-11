const jwt = require("jsonwebtoken")

exports.generateToken = (cookieData) => {
    var token = jwt.sign(cookieData, process.env.SECRET);
    return token;
}

exports.protect = async (req, res, next) => {
    try {
        let token = req.cookies.jwt
        if (token == undefined) throw new Error("Token not exists!")
        jwt.verify(token, process.env.SECRET)
        next()
    } catch(err) {
        res.redirect("/login")
    }
}