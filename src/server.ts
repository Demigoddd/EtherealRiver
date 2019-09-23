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

app.use('/', express.static(path.join(__dirname, '../build')));

app.get('/*', (req: any, res: any) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

createRoutes(app, io);

http.listen(port, () => {
  console.log(`Server: http://localhost:${port}`);
});
