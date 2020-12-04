const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

beforeEach(() => {
    return connection.seed.run();
});

afterAll(() => {
    return connection.destroy();
});

describe("app", () => {
    it("status: 404 for invalid path", () => {
        return request(app)
            .get("/invalid-path")
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Oopsie, Path Not Found!");
            });
    });
    describe("/api", () => {
        describe("/episodes", () => {
            describe("GET", () => {
                it("status 200: responds with status 200", () => {
                    return request(app).get("/api/episodes").expect(200);
                });
                it("status 200: responds with an array", () => {
                    return request(app)
                        .get("/api/episodes")
                        .expect(200)
                        .then(({ body: { episodes } }) => {
                            expect(Array.isArray(episodes)).toBe(true);
                            expect(episodes).toHaveLength(20);
                        });
                });
                it("status 200: responds with the correct keys", () => {
                    return request(app)
                        .get("/api/episodes")
                        .expect(200)
                        .then(({ body: { episodes } }) => {
                            episodes.forEach((episode) => {
                                expect(episode).toHaveProperty("air_date");
                                expect(episode).toHaveProperty("created_at");
                                expect(episode).toHaveProperty("episode");
                                expect(episode).toHaveProperty("episode_id");
                                expect(episode).toHaveProperty("name");
                                expect(episode).toHaveProperty("number");
                                expect(episode).toHaveProperty("url");
                            });
                        });
                });
            });
            describe("POST", () => {
                it("status 201: responds with 201 for a successfully posted episode", () => {
                    return request(app)
                        .post("/api/episodes")
                        .send({
                            name: "Charly's Episode",
                            air_date: "December 4, 2020",
                            episode: "S05E01",
                            url: "https://rickandmortyapi.com/api/episode/100",
                        })
                        .expect(201);
                });
                it("status 201: responds with the successfully posted episode", () => {
                    return request(app)
                        .post("/api/episodes")
                        .send({
                            name: "Charly's Episode",
                            air_date: "December 4, 2020",
                            episode: "S05E01",
                            url: "https://rickandmortyapi.com/api/episode/100",
                        })
                        .expect(201)
                        .then(({ body }) => {
                            expect(body.episode.name).toBe("Charly's Episode");
                            expect(body.episode).toHaveProperty('episode_id');
                            expect(body.episode).toHaveProperty('created_at');
                        })
                });
            });
            describe("INVALID METHODS", () => {
                it("status 405: for invalid methods DELETE, PATCH and PUT", () => {
                    const invalidMethods = ["delete", "patch", "put"];

                    const promises = invalidMethods.map((method) => {
                        return request(app)[method]("/api/episodes")
                            .expect(405)
                            .then(({ body: { msg } }) => {
                                expect(msg).toBe("Nah Pal, Method Not Allowed!");
                            });
                    });
                    return Promise.all(promises);
                });
            });
        });
        describe("/episodes/:episode_id", () => {
            describe("GET", () => {
                it("status 200: responds with status 200 when an episode id is given", () => {
                    return request(app).get("/api/episodes/1").expect(200);
                });
                it("status 200: responds with an array containing an episode when an episode id is given", () => {
                    return request(app)
                        .get("/api/episodes/1")
                        .expect(200)
                        .then((response) => {
                            expect(response.body.episodes[0].air_date).toEqual(
                                "December 2, 2013"
                            );
                            expect(response.body.episodes[0].episode).toEqual("S01E01");
                            expect(response.body.episodes[0].episode_id).toEqual(1);
                            expect(response.body.episodes[0].name).toEqual("Pilot");
                            expect(response.body.episodes[0].number).toEqual(1);
                            expect(response.body.episodes[0].url).toEqual(
                                "https://rickandmortyapi.com/api/episode/1"
                            );
                        });
                });
                it("status 404: NOT FOUND -> responds with an error message if the requested episode does not exist", () => {
                    return request(app)
                        .get("/api/episodes/999")
                        .expect(404)
                        .then((response) => {
                            expect(response.body.msg).toBe("Sorry Pal, Episode Not Found!");
                        });
                });
                it("status 400: BAD REQUEST -> responds with an error message if the episode_id is invalid", () => {
                    return request(app)
                        .get("/api/episodes/notAnId")
                        .expect(400)
                        .then((response) => {
                            expect(response.body.msg).toBe("No Can Do Pal, Bad Request!");
                        });
                });
            });
            describe("INVALID METHODS", () => {
                it("status 405: for invalid methods POST, DELETE, PATCH and PUT", () => {
                    const invalidMethods = ["post", "delete", "patch", "put"];

                    const promises = invalidMethods.map((method) => {
                        return request(app)[method]("/api/episodes/1")
                            .expect(405)
                            .then(({ body: { msg } }) => {
                                expect(msg).toBe("Nah Pal, Method Not Allowed!");
                            });
                    });
                    return Promise.all(promises);
                });
            });
        });
    });
});