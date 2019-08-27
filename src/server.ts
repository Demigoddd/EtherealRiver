import path from 'path';
import express from "express";
import { createServer } from "http";

import "./server/core/db";
import config from './server/utils/config';
import createRoutes from "./server/core/routes";
import createSocket from "./server/core/socket";

const app = express();
const http = createServer(app);
const io = createSocket(http);

if (config.isProduction) {
  app.use(express.static(path.join(__dirname, '..', 'build')));

  app.get('*', (req: any, res: any) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
  });
}

createRoutes(app, io);

http.listen(process.env.PORT || 8080, () => {
  console.log(`Server: http://localhost:${process.env.PORT || 8080}`);
});
