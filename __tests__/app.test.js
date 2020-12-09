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
                it("status 200: responds with an array of episodes matching the name specified in the request query", () => {
                    return request(app)
                        .get("/api/episodes/?name=Pilot")
                        .expect(200)
                        .then(({ body: { episodes } }) => {
                            expect(Array.isArray(episodes)).toBe(true);
                            expect(episodes.length).toBe(1);
                            episodes.forEach((episode) => {
                                expect(episode.name).toBe('Pilot');
                            });
                        });
                });
                it("status 200: responds with an array of episodes matching the number specified in the request query", () => {
                    return request(app)
                        .get("/api/episodes/?number=1")
                        .expect(200)
                        .then(({ body: { episodes } }) => {
                            expect(Array.isArray(episodes)).toBe(true);
                            expect(episodes.length).toBe(1);
                            // console.log(episodes, "EPISODES IN TEST")
                            episodes.forEach((episode) => {
                                expect(episode.number).toBe(1);
                                expect(episode.name).toBe('Pilot');
                            });
                        });
                });
                it("status 404: NOT FOUND responds with an error when name of episode in query does not exist", () => {
                    return request(app)
                        .get("/api/episodes/?name=wrong")
                        .expect(404)
                        .then((response) => {
                            expect(response.body.msg).toBe("Sorry Pal, That Query Was Funky. Episode Not Found!");
                        });
                });
                it("status 404: NOT FOUND responds with an error when number of episode in query does not exist", () => {
                    return request(app)
                        .get("/api/episodes/?number=999")
                        .expect(404)
                        .then((response) => {
                            expect(response.body.msg).toBe("Sorry Pal, That Query Was Funky. Episode Not Found!");
                        });
                });
                it("status 400: BAD REQUEST responds with an error if query is invalid", () => {
                    return request(app)
                        .get("/api/episodes/?nombre=999")
                        .expect(404)
                        .then((response) => {
                            expect(response.body.msg).toBe("Sorry Pal, That Query Was Funky. Episode Not Found!");
                        });
                });
                it("status 404: NOT FOUND no episode is sent back if the queried number does not exist, but the query is potentially valid", () => {
                    return request(app)
                        .get("/api/episodes/?number=9999")
                        .then((response) => {
                            expect(response.body.msg).toBe("Sorry Pal, That Query Was Funky. Episode Not Found!");
                        });
                });
                it("status 404: NOT FOUND no episode is sent back if the queried name does not exist, but the query is potentially valid", () => {
                    return request(app)
                        .get("/api/episodes/?name=Charly")
                        .then((response) => {
                            expect(response.body.msg).toBe("Sorry Pal, That Query Was Funky. Episode Not Found!");
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
                it("status 400: BAD REQUEST -> malformed body/ missing fields responds with an error message", () => {
                    return request(app)
                        .post("/api/episodes")
                        .send({})
                        .expect(400)
                        .then(({ body: { msg } }) => {
                            expect(msg).toBe("No Can Do Pal, Bad Request. Fix Ya Body!");
                        });
                });
                it("status 400: BAD REQUEST -> responds with an error message if request fails schema validation", () => {
                    return request(app)
                        .post("/api/episodes")
                        .send({
                            name: null,
                            air_date: "",
                            episode: "",
                            url: null,
                        })
                        .expect(400)
                        .then(({ body: { msg } }) => {
                            expect(msg).toBe("No Can Do Pal, Bad Request. Fix Ya Body!");
                        });
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
        describe("/locations", () => {
            describe("GET", () => {
                it("status 200: responds with status 200", () => {
                    return request(app).get("/api/locations").expect(200);
                });
                it("status 200: responds with an array", () => {
                    return request(app)
                        .get("/api/locations")
                        .expect(200)
                        .then(({ body: { locations } }) => {
                            expect(Array.isArray(locations)).toBe(true);
                            expect(locations).toHaveLength(20);
                        });
                });
                it("status 200: responds with the correct keys", () => {
                    return request(app)
                        .get("/api/locations")
                        .expect(200)
                        .then(({ body: { locations } }) => {
                            console.log(locations, "LOCATIONS IN TESTS")
                            locations.forEach((location) => {
                                expect(location).toHaveProperty("location_id");
                                expect(location).toHaveProperty("name");
                                expect(location).toHaveProperty("type");
                                expect(location).toHaveProperty("dimension");
                                expect(location).toHaveProperty("url");
                                expect(location).toHaveProperty("created_at");
                            });
                        });
                });
                it("status 200: responds with an array of locations matching the name specified in the request query", () => {
                    return request(app)
                        .get("/api/locations/?name=Abadango")
                        .expect(200)
                        .then(({ body: { locations } }) => {
                            expect(Array.isArray(locations)).toBe(true);
                            expect(locations.length).toBe(1);
                            locations.forEach((location) => {
                                expect(location.name).toBe('Abadango');
                            });
                        });
                });
                it("status 200: responds with an array of locations matching the name specified in the request query", () => {
                    return request(app)
                        .get("/api/locations/?type=Planet")
                        .expect(200)
                        .then(({ body: { locations } }) => {
                            expect(Array.isArray(locations)).toBe(true);
                            locations.forEach((location) => {
                                expect(location.type).toBe('Planet');
                            });
                        });
                });
                it("status 200: responds with an array of locations matching the dimension specified in the request query", () => {
                    return request(app)
                        .get("/api/locations/?dimension=unknown")
                        .expect(200)
                        .then(({ body: { locations } }) => {
                            expect(Array.isArray(locations)).toBe(true);
                            locations.forEach((location) => {
                                expect(location.dimension).toBe('unknown');
                            });
                        });
                });
                it("status 404: NOT FOUND responds with an error when name of location in query does not exist", () => {
                    return request(app)
                        .get("/api/locations/?name=wrong")
                        .expect(404)
                        .then((response) => {
                            expect(response.body.msg).toBe("Sorry Pal, That Query Was Funky. Location Not Found!");
                        });
                });
                it("status 404: NOT FOUND responds with an error when type of location in query does not exist", () => {
                    return request(app)
                        .get("/api/locations/?type=wrong")
                        .expect(404)
                        .then((response) => {
                            expect(response.body.msg).toBe("Sorry Pal, That Query Was Funky. Location Not Found!");
                        });
                });
                it("status 404: NOT FOUND responds with an error when dimension of location in query does not exist", () => {
                    return request(app)
                        .get("/api/locations/?dimension=wrong")
                        .expect(404)
                        .then((response) => {
                            expect(response.body.msg).toBe("Sorry Pal, That Query Was Funky. Location Not Found!");
                        });
                });
                it("status 400: BAD REQUEST responds with an error if query is invalid", () => {
                    return request(app)
                        .get("/api/locations/?nombre=999")
                        .expect(404)
                        .then((response) => {
                            expect(response.body.msg).toBe("Sorry Pal, That Query Was Funky. Location Not Found!");
                        });
                });
                it("status 404: NOT FOUND no location is sent back if the queried type does not exist, but the query is potentially valid", () => {
                    return request(app)
                        .get("/api/locations/?type=Charly")
                        .then((response) => {
                            expect(response.body.msg).toBe("Sorry Pal, That Query Was Funky. Location Not Found!");
                        });
                });
                it("status 404: NOT FOUND no location is sent back if the queried name does not exist, but the query is potentially valid", () => {
                    return request(app)
                        .get("/api/locations/?name=Charly")
                        .then((response) => {
                            expect(response.body.msg).toBe("Sorry Pal, That Query Was Funky. Location Not Found!");
                        });
                });
                it("status 404: NOT FOUND no location is sent back if the queried dimension does not exist, but the query is potentially valid", () => {
                    return request(app)
                        .get("/api/locations/?dimension=Charly")
                        .then((response) => {
                            expect(response.body.msg).toBe("Sorry Pal, That Query Was Funky. Location Not Found!");
                        });
                });
            });
            describe("POST", () => {
                it("status 201: responds with 201 for a successfully posted location", () => {
                    return request(app)
                        .post("/api/locations")
                        .send({
                            name: "Charly's Location",
                            type: "Planet",
                            dimension: "unknown",
                            url: "https://rickandmortyapi.com/api/location/100",
                        })
                        .expect(201);
                });
                it("status 201: responds with the successfully posted episode", () => {
                    return request(app)
                        .post("/api/locations")
                        .send({
                            name: "Charly's Location",
                            type: "Planet",
                            dimension: "unknown",
                            url: "https://rickandmortyapi.com/api/location/100",
                        })
                        .expect(201)
                        .then(({ body }) => {
                            expect(body.location.name).toBe("Charly's Location");
                            expect(body.location).toHaveProperty('location_id');
                            expect(body.location).toHaveProperty('created_at');
                            expect(body.location).toHaveProperty('type');
                            expect(body.location).toHaveProperty('dimension');

                        })
                });
                // it("status 400: BAD REQUEST -> malformed body/ missing fields responds with an error message", () => {
                //     return request(app)
                //         .post("/api/locations")
                //         .send({})
                //         .expect(400)
                //         .then(({ body: { msg } }) => {
                //             expect(msg).toBe("No Can Do Pal, Bad Request. Fix Ya Body!");
                //         });
                // });
                // it("status 400: BAD REQUEST -> responds with an error message if request fails schema validation", () => {
                //     return request(app)
                //         .post("/api/locations")
                //         .send({
                //             name: null,
                //             type: "",
                //             dimension: "",
                //             url: null,
                //         })
                //         .expect(400)
                //         .then(({ body: { msg } }) => {
                //             expect(msg).toBe("No Can Do Pal, Bad Request. Fix Ya Body!");
                //         });
                // });
            });
            describe("INVALID METHODS", () => {
                it("status 405: for invalid methods DELETE, PATCH and PUT", () => {
                    const invalidMethods = ["delete", "patch", "put"];

                    const promises = invalidMethods.map((method) => {
                        return request(app)[method]("/api/locations")
                            .expect(405)
                            .then(({ body: { msg } }) => {
                                expect(msg).toBe("Nah Pal, Method Not Allowed!");
                            });
                    });
                    return Promise.all(promises);
                });
            });
        })
    });
});