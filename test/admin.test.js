'use strict'

require('dotenv').config();
const mongoose = require('mongoose');
const app = require('../index');
const supertest = require('supertest');
const configs = require('../src/config/admin.config')
const request = supertest(app);

// execution before the test suites
beforeAll(async () => {
    const url = `${configs.DB_URL}`;
    await mongoose.connect(url, { useNewUrlParser: true });
});

// execution after the test suites
afterAll(async () => {
    mongoose.disconnect();
})

// suite to test the /login endpoints with a working vs non working scenerio
describe('test the /login endpoint for the admin', () => {
    
    it("login test for /login endpoint", async done => {
        const response = await request.post('/admin/user/login').send({
            username: configs.ADMIN_USER,
            password: configs.ADMIN_PASSW
        })
        expect(response.text).toContain('Redirecting to dashboard');
        done();
    })


    it("login test for /login endpoint (WRONG LOGIN) ", async done => {
        const response = await request.post('/admin/user/login').send({
            username: 'wrongusername16',
            password: 'wrongpassword'
        })
        expect(response.text).toContain('err');
        done();
    })
})