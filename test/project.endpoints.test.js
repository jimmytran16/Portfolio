'use strict'

require('dotenv').config();
const app = require('../index.js');
const supertest = require('supertest');
const request = supertest(app);

const mongoose = require("mongoose");
const configs = require('../src/config/main.config');

// execution before the test suites
beforeAll(async () => {
  const url = `${configs.DB_URL}`;
  await mongoose.connect(url, { useNewUrlParser: true });
});

// execution after the test suites
afterAll(async () => {
    mongoose.disconnect();
});

// test cases for app's endpoints
// checking to ensure all endpoints are returning a 200 response status
describe("testing the endpoints of the blog feature" , () => {

    it("Should get a 200 response for /" , async done => {
        const response = await request.get("/");
        expect(response.statusCode).toBe(200);
        done();
    })

    it("testing .. /blog" , async done => {
        const response = await request.get('/blog');
        expect(response.statusCode).toBe(200);
        done();
    })

    it("testing .. /index.html#aboutme" , async done => {
        const response = await request.get('/index.html#aboutme');
        expect(response.statusCode).toBe(200);
        done();
    })

    it("testing .. /index.html#projects" , async done => {
        const response = await request.get('/index.html#projects');
        expect(response.statusCode).toBe(200);
        done();
    })

    it("testing ... /projects/greenvoter.html", async done => {
        const response = await request.get('/projects/greenvoter.html');
        expect(response.statusCode).toBe(200);
        done();
    })

    it("testing .. /projects/sendcoviddata.html" , async done => {
        const response = await request.get('/projects/sendcoviddata.html');
        expect(response.statusCode).toBe(200);
        done();
    })

    it("testing .. /projects/dnsproject.html" , async done => {
        const response = await request.get('/projects/dnsproject.html');
        expect(response.statusCode).toBe(200);
        done();
    })

    it("testing .. /projects/bookproject.html" , async done => {
        const response = await request.get('/projects/bookproject.html');
        expect(response.statusCode).toBe(200);
        done();
    })

    it("testing .. /projects/blogproject.html" , async done => {
        const response = await request.get('/projects/blogproject.html');
        expect(response.statusCode).toBe(200);
        done();
    })

    it("testing... /projects/hpsproject.html" , async done => {
        const response = await request.get('/projects/hpsproject.html');
        expect(response.statusCode).toBe(200);
        done();
    })
})

