require('dotenv').config();
const app = require('../index');
const supertest = require('supertest');
const request = supertest(app);
const Post = require('../model/posts');
const mongoose = require('mongoose');


// suite to test the database queries
describe("Testing database queries", () => {

    // execution before the test suites
    beforeAll(async () => {
        const url = `${process.env.DB_URL}`;
        await mongoose.connect(url, { useNewUrlParser: true });
    });

    // execution after the test suites
    afterAll(async () => {
        mongoose.disconnect();
    });

    it("Should have 10 blogs in total right now", async done => {
        // query all of the posts from mongoose
        Post.find({}, function (err, data) {
            if (err) { console.log(err) }
            else {
                let size_of_data = Object.keys(data).length;
                let image_path_data = data[0].img_path.split(':')[0];
                expect(image_path_data).toBe('https');
                expect(size_of_data).toBe(10);
                done();
            }
        })
    });

})
