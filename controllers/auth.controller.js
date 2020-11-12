const jwt = require("jsonwebtoken")

exports.generateToken = (cookieData) => {
    var token = jwt.sign(cookieData, process.env.SECRET);
    return token;
}

exports.protect = async (req, res) => {
    try {
        let token = req.cookies.jwt
        if (token == undefined) throw new Error("Token not exists!")
        jwt.verify(token, process.env.SECRET)
        res.status(200).json({
            status: "success",
            message: "token is correct!"
        })
    } catch(err) {
        res.status(401).json({
            status: "faild",
            message: "token is not correct!"
        })
    }
}