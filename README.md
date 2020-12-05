![The Rick and Mortyfied API](https://repository-images.githubusercontent.com/120371205/b6740400-92d4-11ea-8a13-d5f6e0558e9b)

# Rick and MortyFied API

A RESTful API based on the TV show Rick and Morty.



## REST

- The base url contains information about all available API's resources. All requests are GET requests and go over https. All responses will return data in json.

- Sample Request:
```
https://rickandmortyapi.com/api/

{
  "characters": "https://rickandmortyapi.com/api/character",
  "locations": "https://rickandmortyapi.com/api/location",
  "episodes": "https://rickandmortyapi.com/api/episode"
}
```

- There are three available resources:
* Characters
* Locations
* Episodes




## Locations

### Locations Schema:

| location_id | name | type | dimension | url |created_at |
|----|----|----|----|----|----|
| SERIAL PRIMARY KEY | string VARCHAR | string VARCHAR | string VARCHAR | string VARCHAR | timestamp |
| The id of the location | The name of the location | The type of the location | The dimension of the location | The url of the location | Time at which the location was created in the database |

### Locations endpoints:

```
GET /api/locations

GET /api/locations/:location_id
POST /api/locations/:location_id

Queries:
GET /api/locations/?name=earth
GET /api/locations/?type=planet
GET /api/locations/?dimension=C-137
```


## Characters

### Characters Schema:

| character_id | name | status | species | type | gender | origin | location | image | url | created_at |
|----|----|----|----|----|----|----|----|----|----|----|
| SERIAL PRIMARY KEY | string VARCHAR | string VARCHAR | string VARCHAR | string VARCHAR | string VARCHAR | string REFERENCES locations.name | string REFERENCES locations.name | string | string | timestamp |
| The id of the character | The name of the character | The status of the character ('Alive', 'Dead' or 'unknown') | The species of the character | The type of the character | The gender of the character ('Female', 'Male', 'Genderless' or 'unknown') | The character's origin location | The character's last known location | The character's image url | The characters url | Time at which the character was created in the database |

### Characters endpoints:

```
GET /api/characters

GET /api/characters/:character_id
POST /api/characters/:character_id
PATCH /api/characters/:character_id

Queries:
GET /api/characters/?name=rick
GET /api/characters/?status=dead
GET /api/characters/?species=human
GET /api/characters/?gender=female
```



## Episodes

### Episodes Schema:

| episode_id | number | name | air_date | episode | created | 
|----|----|----|----|----|----|
| SERIAL PRIMARY KEY | integer | string VARCHAR | string VARCHAR | string VARCHAR | timestamp |
| The id of the episode | The number of the episode | The name of the episode | The air date of the episode | A series and episodes in traditional T.V. format | Time at which the episode was created in the database |

### Episodes endpoints:

```
GET /api/episodes

GET /api/episodes/:episode_id
POST /api/episodes/:episode_id

Queries:
GET /api/episodes/?name=close+rick+encounters+of+the+rick+kind
```



## Route Requirements:



```
GET /api/locations
```

#### Responds with

- an array of location objects, each of which should have the following properties:
  - location_id 
  - name
  - type 
  - dimension 
  - created_at

---

```
GET /api/locations/:location_id
```

#### Responds with

- a location object, which should have the following properties:
  - location_id 
  - name
  - type 
  - dimension 
  - created_at

---

```
POST /api/locations/:location_id
```

#### Request body accepts

- an object with the following properties:
  - name
  - type
  - dimension

#### Responds with

- the posted location

---

```
GET /api/locations/?name=earth
```

#### Responds with

- a location object, filtered by name, which should have the following properties:
  - location_id 
  - name
  - type 
  - dimension 
  - created_at

---

```
GET /api/locations/?type=planet
```

#### Responds with

- a location object, filtered by type, which should have the following properties:
  - location_id 
  - name
  - type 
  - dimension 
  - created_at

---

```
GET /api/locations/?dimension=C-137
```

#### Responds with

- a location object, filtered by dimension, which should have the following properties:
  - location_id 
  - name
  - type 
  - dimension 
  - created_at

---


```
GET /api/characters
```

```
GET /api/characters/:character_id
```

```
POST /api/characters/:character_id
```

```
PATCH /api/characters/:character_id
```

```
GET /api/characters/?name=rick
```

```
GET /api/characters/?status=dead
```

```
GET /api/characters/?species=human
```

```
GET /api/characters/?gender=female
```


```
GET /api/episodes
```

#### Responds with

- an array of episodes objects, each of which should have the following properties:
  - episode_id 
  - name
  - air_date 
  - episode 
  - url
  - created_at

  #### Should accept queries
* ```name```, which filters the episode by the name specifed in the query
e.g. 
```
GET /api/episodes/?name=close+rick+encounters+of+the+rick+kind
```

```
GET /api/episodes/:episode_id
```

#### Responds with

- an episodes object, which should have the following properties:
  - episode_id 
  - name
  - air_date 
  - episode 
  - url
  - created_at

```
POST /api/episodes/:episode_id
```

#### Request body accepts
- an object with the following properties:
  - name
  - air_date 
  - episode 
  - url

#### Responds with
- The posted episode


