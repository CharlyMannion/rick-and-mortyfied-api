const request = require('supertest');
const app = require('../app');
const connection = require('../db/connection');

beforeEach(() => {
    return connection.seed.run()
});

afterAll(() => {
    return connection.destroy()
});

describe('app', () => {
    it('status: 404 for invalid path', () => {
        return request(app)
            .get('/invalid-path')
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe('oopsie, path not found')
            });
    });
})