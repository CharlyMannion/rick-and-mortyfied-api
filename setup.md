# Rick & Mortyfied API - setup info

## Background

I will be building an API for the purpose of accessing application data programmatically. The intention here is to mimick the building of a real world backend service, which should provide this information to the front end architecture.

My database will be PSQL, and you will interact with it using [Knex](https://knexjs.org).

I will complete setup and seeding phase of this project, then build the server up! 

## Step 1 - Setting up your project

Setup the knexfile. 

I will write a `db` folder with some data, a [setup.sql](./db/setup.sql) file, a `seeds` folder and a `utils` folder. 

My next task is to make accessing both sets of data around your project easier. I will make 3 `index.js` files: one in `db/data`, and one in each of my data folders (test & development).

The job of `index.js` in each the data folders is to export out all the data from that folder, currently stored in separate files. This is so that, when you need access to the data elsewhere, you can write one convenient require statement - to the index file, rather than having to require each file individually. Think of it like a index of a book - a place to refer to! Make sure the index file exports an object with values of the data from that folder with the keys:

- `characterData`
- `locationData`
- `episodeData`

The job of the `db/data/index.js` file will be to export out of the db folder _only the data relevant to the current environment_. Specifically this file should allow your seed file to access only a specific set of data depending on the environment it's in: test, development or production. To do this it will have to require in all the data and should make use of `process.env` in your `index.js` file to achieve only exporting the right data out.

**HINT: make sure the keys you export match up with the keys required into the seed file**

## Step 2 - Migrations and Seeding

Your seed file should now be set up to require in either test or dev data depending on the environment.

You will need to create your migrations and complete the provided seed function to insert the appropriate data into your database.

### Migrations

This is where you will set up the schema for each table in your database.

You should have separate tables for `characters`, `locations`, and `episodes`. You will need to think carefully about the order in which you create your migrations. You should think carefully about whether you require any constraints on your table columns (e.g. 'NOT NULL')

Each location should have:

- `location_id` serial primary key
- `name` 
- `type` 
- `dimension` 
- `created_at` defaults to the current timestamp

Each character should have:

- `character_id` serial primary key
- `name` 
- `status`
- `species`
- `gender`
- `origin`
- `location`
- `first_episode`
- `created_at` defaults to the current timestamp

Each episode should have:

- `episode_id` serial primary key
- `name` 
- `air_date` 
- `characters` 
- `created_at` defaults to the current timestamp


- **NOTE:** psql expects `Timestamp` types to be in a specific date format - **not a unix timestamp** as they are in our data! However, you can easily **re-format a unix timestamp into something compatible with our database using JS - you will be doing this in your utility functions**... [JavaScript Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

### Seeding

You need to complete the provided seed function to insert the appropriate data into your database.

Utilising your data manipulation skills, you will need to design some utility functions to ensure that the data can fit into your tables. These functions should be extracted into your `utils.js` and built using TDD. If you're feeling stuck, think about how the data looks now and compare it to how it should look for it fit into your table. The katas we gave you on day 1 of this block might be useful.

**Some advice: don't write all the utility functions in one go, write them when you need them in your seed**

---

## Step 3 - Building Endpoints

- Use proper project configuration from the offset, being sure to treat development and test environments differently.
- Test each route **as you go**, checking both successful requests **and the variety of errors you could expect to encounter** [See the error-handling file here for ideas of errors that will need to be considered](error-handling.md).
- After taking the happy path when testing a route, think about how a client could make it go wrong. Add a test for that situation, then error handling to deal with it gracefully.
- **HINT**: You will need to take advantage of knex migrations in order to efficiently test your application.

---

### Vital Routes


_details for each endpoint are provided in README.md_

### Route Requirements

_**All of your endpoints should send the below responses in an object, with a key name of what it is that being sent. E.g.**_

```json
{
  "topics": [
    {
      "description": "Code is love, code is life",
      "slug": "coding"
    },
    {
      "description": "FOOTIE!",
      "slug": "football"
    },
    {
      "description": "Hey good looking, what you got cooking?",
      "slug": "cooking"
    }
  ]
}
```

---

```http
GET /api/locations
```

#### Responds with

- an array of location objects, each of which should have the following properties:
- `location_id` 
- `name` 
- `type` 
- `dimension` 
- `created_at` 

---
