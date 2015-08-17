# tantive

![Tantive IV](http://i.imgur.com/SXzquMv.jpg)

Prototype future rocketship.


## Installation

Prerequisites: [git](https://git-scm.com/), [Node](https://nodejs.org/), [PostgreSQL](http://www.postgresql.org/).

```sh
git clone https://github.com/chuckharmston/tantive.git
cd tantive
npm install
```


## Usage

```sh
gulp
```


## GraphQL

To load fixture data into the database, make sure that the application can connect to a database via `postgres://localhost:5432/postgres`, then run:

```sh
babel-node ./src/models/fixture.js
```

Then run your first query:

```sh
curl -XPOST -H "Content-Type:application/graphql"  -d '{addons{id name description developer}}' http://localhost:3000/api/
```
