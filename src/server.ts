// Main Exports
import express from 'express';
import SocketIO from 'socket.io';
import path from 'path';
import * as http from 'http';
import * as bodyparser from 'body-parser';

import routes from './server/routes';
import session from './server/utils/session';
import passport from './server/utils/auth';
import ioServer from './server/utils/socket';
import config from './server/utils/config';

// Init App
const app: any = express();
const server: any = http.createServer(app);
const io: any = SocketIO(server);

ioServer(io);

// Middlewares
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

if (config.isProduction) {
  app.use(express.static(path.join(__dirname, '..', 'build')));

  app.get('*', (req: any, res: any) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
  });
}

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

// Start server
server.listen(process.env.PORT || 8080, () => {
  console.log('Listening on port ' + server.address().port);
});
