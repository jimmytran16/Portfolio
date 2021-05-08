const mongoose = require('mongoose');

// Schema used for blog posts

// define the post schema
var postSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    minutes : { type: Number, required: true },
    date: { type: String, default: () => { return new Date().toLocaleString() } },
    img_path: { type: String, required: false },
    tags : { type: Array, required: false } 
})

// get the Post object from the model and export it
var Post = mongoose.model('Post',postSchema);

module.exports = Post;