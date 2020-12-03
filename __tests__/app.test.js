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
    describe('/api', () => {
        describe('/episodes', () => {
            describe('GET', () => {
                it('status 200: responds with status 200', () => {
                    return request(app).get('/api/episodes').expect(200);
                });
                it('status 200: responds with an array', () => {
                    return request(app)
                        .get('/api/episodes')
                        .expect(200)
                        .then(({ body: { episodes } }) => {
                            expect(Array.isArray(episodes)).toBe(true);
                            expect(episodes).toHaveLength(20);
                        });
                });
                it('status 200: responds with the correct keys', () => {
                    return request(app)
                        .get('/api/episodes')
                        .expect(200)
                        .then(({ body: { episodes } }) => {
                            episodes.forEach((episode) => {
                                expect(episode).toHaveProperty('air_date');
                                expect(episode).toHaveProperty('created_at');
                                expect(episode).toHaveProperty('episode');
                                expect(episode).toHaveProperty('episode_id');
                                expect(episode).toHaveProperty('name');
                                expect(episode).toHaveProperty('number');
                                expect(episode).toHaveProperty('url');
                            });
                        });
                });
            });
        });
    });
})