const mongoose = require('mongoose');

// Schema used for blog posts

// define the post schema
var postSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, default: new Date().toLocaleString() },
})

// get the Post object from the model and export it
var Post = mongoose.model('Post',postSchema);

module.exports = Post;