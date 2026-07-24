const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')


const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res) {

    const token = req.cookies.token

    if(!token){
        res.status(401).json({
            message: "Token not provided, Unauthorized access!"
        })
    }
    
    let decoded = null

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        res.status(401).json({
            message: "User not authorized!"
        })
    }

    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "test",
        folder: "insta-clone"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.id
    })

    res.status(201).json({
        message: "Post created!",
        post
    })
}

async function getPostController(req, res) {
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message: "Unauthorized Access!"
        })
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        res.status(401).json({
            message: "Token Invalid"
        })
    }

    const userId = decoded.id

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: "Post fetched successfully!",
        posts
    })
}

async function getPostDetails(req, res) {

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message: "Unauthorized Access!"
        })
    }

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        res.status(401).json({
            message: "Invalid Token!"
        })
    }

    const userId = decoded.id

}

module.exports = { createPostController, getPostController, getPostDetails }