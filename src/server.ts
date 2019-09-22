import path from 'path';
import express from "express";
import { createServer } from "http";

import "./server/core/db";
import config from './server/utils/config';
import createRoutes from "./server/core/routes";
import createSocket from "./server/core/socket";

const port = (process.env.PORT || 3003);
const app = express();
const http = createServer(app);
const io = createSocket(http);

createRoutes(app, io);

if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, '..', 'build')));

  app.get('*', (req: any, res: any) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
  });
}

http.listen(port, () => {
  console.log(`Server: http://localhost:${port}`);
});
