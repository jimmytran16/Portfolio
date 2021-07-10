'use strict'

const BlogUtil = require('../utils/blogUtils')
const Post = require('../model/posts')
const { Storage } = require('@google-cloud/storage');
const configs = require('../config/admin.config')

// function for the admin to submit a post
// will send the blog image to firebase
// save blog info into mongoDB
module.exports = function submitPostController(req, res, next) {

    if (!req.file) {
        res.status(400).send('Error, could not upload file');
        res.end();
        return;
    }

    // Create new storage instance with Firebase project credentials
    const storage = new Storage({
        projectId: configs.GCLOUD_PROJECT_ID,
        keyFilename: configs.GCLOUD_APPLICATION_CREDENTIALS,
    });

    // Create a bucket associated to Firebase storage bucket
    const bucket = storage.bucket(configs.GCLOUD_STORAGE_BUCKET_URL);

    let title = req.body.title;
    let description = req.body.description;
    let tags = req.body.tags;
    let custom_tags = req.body.custom_tags;

    // validate if the tag is passed in
    if (!tags) {
        tags = [];
    }

    // Create new blob in the bucket referencing the file
    // req.file.originalname = req.file.originalname + Date.now() + Math.random();
    // console.log(req.file.originalname)
    const blob = bucket.file(req.file.originalname);

    // Create writable stream and specifying file mimetype
    const blobWriter = blob.createWriteStream({
        metadata: {
            contentType: req.file.mimetype,
        },
    });
    blobWriter.on('error', (err) => {
        console.log(err);
        res.send(err);
        res.end();
        return;
    });

    blobWriter.on('finish', () => {
        // Assembling public URL for accessing the file via HTTP
        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name
            }/o/${encodeURI(blob.name)}?alt=media`;

        // create a post object
        let post = new Post({
            title: title,
            description: description,
            minutes: BlogUtil.calculateReadTimePerPost(description),
            img_path: publicUrl,
            tags: BlogUtil.proccessTags((Array.isArray(tags) ? tags : Array(tags)), (custom_tags === '' ? null : custom_tags.split(',')))
        })

        // When there is no more data to be consumed from the stream
        // save the post to the database
        post.save((err, result) => {
            if (err) {
                console.log(err);
                res.send(err);
                res.end();
            }
            else {
                res.redirect(configs.DASHBOARD_URL);
            }
        })

    });
    blobWriter.end(req.file.buffer);
}