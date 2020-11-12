const path = require("path")
const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser')
const cors = require("cors")
require("dotenv").config()

// create app
const app = express()

// middilewares
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(express.static(path.join(__dirname, "/front/build")))

// mongoose
//FIXME: handle error (if something went wrong while connecting to db)
try {
    const db_url = process.env.DB_URL.replace("<PASSWORD>", process.env.DB_PASS)
    mongoose.connect(db_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });

    let db = mongoose.connection
    db.once("open", () => console.log("You now connected with Mongodb!"))
} catch (err) {
    console.log("Can't connect to server:", err)
}

// routers
const usersRouter = require("./routers/user.router")
app.use("/", usersRouter)

const loginRouter = require("./routers/login.router")
app.use("/login", loginRouter)

const {protect} = require("./controllers/auth.controller")
app.get("/auth", protect)

const {logoutUser} = require("./controllers/login-controller")
app.get("/logout", logoutUser)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "front/build/index.html"))
})

// start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`You are now on port ${PORT}!`)
})