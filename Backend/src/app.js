const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')


const app = express()
app.use(express.json())
app.use(express.static("./public"))
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))


const authRouter = require('./routes/auth.routes')
const postRouter = require('./routes/post.routes')
const userRouter = require('./routes/user.routes')

app.use("/api/auth", authRouter)
app.use("/api/posts", postRouter)
app.use("/api/users", userRouter)

app.use('*name', (req, res) => {
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})

module.exports = app