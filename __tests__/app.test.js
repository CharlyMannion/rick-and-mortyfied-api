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
                            // console.log(locations, "LOCATIONS IN TESTS")
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
                it("status 400: BAD REQUEST -> malformed body/ missing fields responds with an error message", () => {
                    return request(app)
                        .post("/api/locations")
                        .send({})
                        .expect(400)
                        .then(({ body: { msg } }) => {
                            expect(msg).toBe("No Can Do Pal, Bad Request. Fix Ya Body!");
                        });
                });
                it("status 400: BAD REQUEST -> responds with an error message if request fails schema validation", () => {
                    return request(app)
                        .post("/api/locations")
                        .send({
                            name: null,
                            type: "",
                            dimension: "",
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
        describe("/locations/:location_id", () => {
            describe("GET", () => {
                it("status 200: responds with status 200 when an location id is given", () => {
                    return request(app).get("/api/locations/1").expect(200);
                });
                it("status 200: responds with an array containing an location when an location id is given", () => {
                    return request(app)
                        .get("/api/locations/2")
                        .expect(200)
                        .then((response) => {
                            expect(response.body.locations[0].location_id).toEqual(2);
                            expect(response.body.locations[0].name).toEqual("Abadango");
                            expect(response.body.locations[0].type).toEqual('Cluster');
                            expect(response.body.locations[0].dimension).toEqual('unknown');
                            expect(response.body.locations[0].url).toEqual(
                                'https://rickandmortyapi.com/api/location/2'
                            );
                        });
                });
                it("status 404: NOT FOUND -> responds with an error message if the requested location does not exist", () => {
                    return request(app)
                        .get("/api/locations/999")
                        .expect(404)
                        .then((response) => {
                            expect(response.body.msg).toBe("Sorry Pal, Location Not Found!");
                        });
                });
                it("status 400: BAD REQUEST -> responds with an error message if the location_id is invalid", () => {
                    return request(app)
                        .get("/api/locations/notAnId")
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
                        return request(app)[method]("/api/locations/1")
                            .expect(405)
                            .then(({ body: { msg } }) => {
                                expect(msg).toBe("Nah Pal, Method Not Allowed!");
                            });
                    });
                    return Promise.all(promises);
                });
            });
        });
        describe("/characters", () => {
            describe("GET", () => {
                it("status 200: responds with status 200", () => {
                    return request(app).get("/api/characters").expect(200);
                });
                it("status 200: responds with an array", () => {
                    return request(app)
                        .get("/api/characters")
                        .expect(200)
                        .then(({ body: { characters } }) => {
                            expect(Array.isArray(characters)).toBe(true);
                            expect(characters).toHaveLength(20);
                        });
                });
                it("status 200: responds with the correct keys", () => {
                    return request(app)
                        .get("/api/characters")
                        .expect(200)
                        .then(({ body: { characters } }) => {
                            // console.log(characters, "characters IN TESTS")
                            characters.forEach((character) => {
                                expect(character).toHaveProperty("character_id");
                                expect(character).toHaveProperty("name");
                                expect(character).toHaveProperty("status");
                                expect(character).toHaveProperty("species");
                                expect(character).toHaveProperty("type");
                                expect(character).toHaveProperty("gender");
                                expect(character).toHaveProperty("location");
                                expect(character).toHaveProperty("image");
                                expect(character).toHaveProperty("url");
                                expect(character).toHaveProperty("created_at");
                            });
                        });
                });
                it("status 200: responds with an array of characters matching the name specified in the request query", () => {
                    return request(app)
                        .get("/api/characters/?name=Annie")
                        .expect(200)
                        .then(({ body: { characters } }) => {
                            expect(Array.isArray(characters)).toBe(true);
                            characters.forEach((character) => {
                                expect(character.name).toBe('Annie');
                                expect(character.gender).toBe('Female');
                            });
                        });
                });
                it("status 200: responds with an array of characters matching the status specified in the request query", () => {
                    return request(app)
                        .get("/api/characters/?status=Alive")
                        .expect(200)
                        .then(({ body: { characters } }) => {
                            expect(Array.isArray(characters)).toBe(true);
                            characters.forEach((character) => {
                                expect(character.status).toBe('Alive');
                                expect(character.status).not.toBe('Dead');
                            });
                        });
                });
                it("status 200: responds with an array of characters matching the species specified in the request query", () => {
                    return request(app)
                        .get("/api/characters/?species=Human")
                        .expect(200)
                        .then(({ body: { characters } }) => {
                            expect(Array.isArray(characters)).toBe(true);
                            characters.forEach((character) => {
                                expect(character.species).toBe('Human');
                                expect(character.species).not.toBe('Alien');
                            });
                        });
                });
                it("status 200: responds with an array of characters matching the gender specified in the request query", () => {
                    return request(app)
                        .get("/api/characters/?gender=Female")
                        .expect(200)
                        .then(({ body: { characters } }) => {
                            expect(Array.isArray(characters)).toBe(true);
                            characters.forEach((character) => {
                                expect(character.gender).toBe('Female');
                                expect(character.gender).not.toBe('Male');
                            });
                        });
                });
                it("status 404: NOT FOUND responds with an error when name of character in query does not exist", () => {
                    return request(app)
                        .get("/api/characters/?name=wrong")
                        .expect(404)
                        .then((response) => {
                            expect(response.body.msg).toBe("Sorry Pal, That Query Was Funky. Character Not Found!");
                        });
                });
                it("status 404: NOT FOUND responds with an error when status of character in query does not exist", () => {
                    return request(app)
                        .get("/api/characters/?status=wrong")
                        .expect(404)
                        .then((response) => {
                            expect(response.body.msg).toBe("Sorry Pal, That Query Was Funky. Character Not Found!");
                        });
                });
                it("status 404: NOT FOUND responds with an error when species of character in query does not exist", () => {
                    return request(app)
                        .get("/api/characters/?species=wrong")
                        .expect(404)
                        .then((response) => {
                            expect(response.body.msg).toBe("Sorry Pal, That Query Was Funky. Character Not Found!");
                        });
                });
                it("status 404: NOT FOUND responds with an error when gender of character in query does not exist", () => {
                    return request(app)
                        .get("/api/characters/?gender=wrong")
                        .expect(404)
                        .then((response) => {
                            expect(response.body.msg).toBe("Sorry Pal, That Query Was Funky. Character Not Found!");
                        });
                });
                it("status 400: BAD REQUEST responds with an error if query is invalid", () => {
                    return request(app)
                        .get("/api/characters/?nombre=999")
                        .expect(404)
                        .then((response) => {
                            expect(response.body.msg).toBe("Sorry Pal, That Query Was Funky. Character Not Found!");
                        });
                });
            });
            describe("POST", () => {
                it("status 201: responds with 201 for a successfully posted character", () => {
                    return request(app)
                        .post("/api/characters")
                        .send({
                            name: "Charly",
                            status: "Alive",
                            species: "Human",
                            type: "",
                            gender: "Female",
                            origin: "Earth (C-137)",
                            location: "Earth (C-137)",
                            image: "https://scontent-lht6-1.xx.fbcdn.net/v/t1.0-9/16299_10152453068786263_5662911967803183478_n.jpg?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_ohc=bkHeoWVGZpkAX97ltPu&_nc_ht=scontent-lht6-1.xx&oh=78a91e88f90e091d2014292715316b90&oe=5FF6EA72",
                            url: "https://rickandmortyapi.com/api/character/21",
                        })
                        .expect(201);
                });
                it("status 201: responds with the successfully posted character", () => {
                    return request(app)
                        .post("/api/characters")
                        .send({
                            name: "Charly",
                            status: "Alive",
                            species: "Human",
                            type: "",
                            gender: "Female",
                            origin: "Earth (C-137)",
                            location: "Earth (C-137)",
                            image: "https://scontent-lht6-1.xx.fbcdn.net/v/t1.0-9/16299_10152453068786263_5662911967803183478_n.jpg?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_ohc=bkHeoWVGZpkAX97ltPu&_nc_ht=scontent-lht6-1.xx&oh=78a91e88f90e091d2014292715316b90&oe=5FF6EA72",
                            url: "https://rickandmortyapi.com/api/character/21",
                        })
                        .expect(201)
                        .then(({ body }) => {
                            expect(body.character.name).toBe("Charly");
                            expect(body.character).toHaveProperty("character_id");
                            expect(body.character).toHaveProperty("name");
                            expect(body.character).toHaveProperty("status");
                            expect(body.character).toHaveProperty("species");
                            expect(body.character).toHaveProperty("type");
                            expect(body.character).toHaveProperty("gender");
                            expect(body.character).toHaveProperty("location");
                            expect(body.character).toHaveProperty("image");
                            expect(body.character).toHaveProperty("url");
                            expect(body.character).toHaveProperty("created_at");
                        });
                });
                it("status 400: BAD REQUEST -> malformed body/ missing fields responds with an error message", () => {
                    return request(app)
                        .post("/api/characters")
                        .send({})
                        .expect(400)
                        .then(({ body: { msg } }) => {
                            expect(msg).toBe("No Can Do Pal, Bad Request. Fix Ya Body!");
                        });
                });
                it("status 400: BAD REQUEST -> responds with an error message if request fails schema validation", () => {
                    return request(app)
                        .post("/api/characters")
                        .send({
                            name: "",
                            status: "",
                            species: "",
                            type: "",
                            gender: null,
                            origin: null,
                            location: null,
                            image: null,
                            url: null,
                        })
                        .expect(400)
                        .then(({ body: { msg } }) => {
                            expect(msg).toBe("No Can Do Pal, Bad Request. Fix Ya Body!");
                        });
                });
            });
        });
        describe("INVALID METHODS", () => {
            it("status 405: for invalid methods DELETE, PATCH and PUT", () => {
                const invalidMethods = ["delete", "patch", "put"];

                const promises = invalidMethods.map((method) => {
                    return request(app)[method]("/api/characters")
                        .expect(405)
                        .then(({ body: { msg } }) => {
                            expect(msg).toBe("Nah Pal, Method Not Allowed!");
                        });
                });
                return Promise.all(promises);
            });
        });
        describe("/characters/:character_id", () => {
            describe("GET", () => {
                it("status 200: responds with status 200 when a character id is given", () => {
                    return request(app).get("/api/characters/1").expect(200);
                });
                it("status 200: responds with an array containing an character when an character id is given", () => {
                    return request(app)
                        .get("/api/characters/17")
                        .expect(200)
                        .then((response) => {
                            expect(response.body.characters[0].character_id).toEqual(17);
                            expect(response.body.characters[0].name).toEqual("Annie");
                            expect(response.body.characters[0].status).toEqual('Alive');
                            expect(response.body.characters[0].species).toEqual('Human');
                            expect(response.body.characters[0].type).toEqual('');
                            expect(response.body.characters[0].gender).toEqual('Female');
                            expect(response.body.characters[0].location).toEqual("Anatomy Park");
                            expect(response.body.characters[0].image).toEqual("https://rickandmortyapi.com/api/character/avatar/17.jpeg");
                            expect(response.body.characters[0].url).toEqual(
                                "https://rickandmortyapi.com/api/character/17"
                            );
                        });
                });
                it("status 404: NOT FOUND -> responds with an error message if the requested character does not exist", () => {
                    return request(app)
                        .get("/api/characters/999")
                        .expect(404)
                        .then((response) => {
                            expect(response.body.msg).toBe("Sorry Pal, Character Not Found!");
                        });
                });
                it("status 400: BAD REQUEST -> responds with an error message if the character_id is invalid", () => {
                    return request(app)
                        .get("/api/characters/notAnId")
                        .expect(400)
                        .then((response) => {
                            expect(response.body.msg).toBe("No Can Do Pal, Bad Request!");
                        });
                });
            });
            describe("PATCH", () => {
                it('status 200: responds with status 200', () => {
                    return request(app).patch('/api/characters/1').send({ location: "Anatomy Park" }).expect(200);
                });
                it('status 200: responds with the specified article', () => {
                    const newLocation = "Anatomy Park";
                    return request(app)
                        .patch('/api/characters/1')
                        .send({ location: "Anatomy Park" })
                        .expect(200)
                        .then(({ body }) => {
                            expect(body.character.character_id).toBe(1);
                        })
                });
            })
            describe("INVALID METHODS", () => {
                it("status 405: for invalid methods POST, DELETE and PUT", () => {
                    const invalidMethods = ["post", "delete", "put"];

                    const promises = invalidMethods.map((method) => {
                        return request(app)[method]("/api/characters/1")
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