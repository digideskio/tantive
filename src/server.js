import path from 'path';

import express from 'express';
import graphQLServer from 'express-graphql';
import session from 'express-session';
import sessionRedis from 'connect-redis';

import schema from './data/schema';


let app = express();
let RedisStore = sessionRedis(session);

// First, we'll nab static files.
app.use(express.static('build'));

// Then we'll hit a GraphQL API server.
app.use('/api', graphQLServer({
  pretty: true,
  schema: schema,
}));

// Everything else goes to React.
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

// Get the server started.
let server = app.listen(3000, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Server running at http://localhost:3000');
});

export default server;
