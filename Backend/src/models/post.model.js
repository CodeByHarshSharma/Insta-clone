const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    imgUrl: {
        type: String,
    },
    type: {
        type: String,
        enum: ['image', 'text'],
        default: "image"
    },
    content: {
        type: String,
        maxlength: [280, "Text posts can't exceed 280 characters"]
    },
    category: {
        type: String,
        enum: ['general', 'tech', 'art', 'music', 'sports', 'food', 'travel'],
        default: 'general'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "user-id is required!"]
    }
}, { timestamps: true })

const postModel = mongoose.model('posts', postSchema)

module.exports = postModel