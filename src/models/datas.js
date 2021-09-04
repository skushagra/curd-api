const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const Post = new mongoose.model('Post', dataSchema)
module.exports = Post;