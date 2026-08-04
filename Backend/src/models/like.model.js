const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: [true, "Post ID is requried"]
    },
    user: {
        type: String,
        required: [true, "Username is requried"]
    }
},{
    timestamps: true
})

likeSchema.index({post: 1, user: 1 }, {unique: true})

const likeModel = mongoose.model("likes", likeSchema)

module.exports = likeModel;