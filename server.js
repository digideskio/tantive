import path from 'path';

import express from 'express';
import graphQLServer from 'express-graphql';
import session from 'express-session';
import sessionRedis from 'connect-redis';

import schema from './src/data/schema';


let app = express();
let RedisStore = sessionRedis(session);

// Homepage and static files.
app.use(express.static('build'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Use Redis for session storage.
app.use(session({
  store: new RedisStore({
    host: 'localhost',
    port: 6379
  }),
  secret: 'Great, kid. Don’t get cocky.'
}));

// Start a GraphQL server at /api.
app.use('/api', graphQLServer({
  pretty: true,
  schema: schema,
}));

// Get the server started.
let server = app.listen(3333, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Server running at http://localhost:3000');
});

export default server;
