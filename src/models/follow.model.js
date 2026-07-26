const mongoose = require('mongoose')

const followSchema = new mongoose.Schema({
    follower :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Follower is requried!"]
    },
    followee :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Followee is requried"]
    },
},{
    timestamps: true
})

const followModel = mongoose.model("follows", followSchema)

module.exports = followModel