import express from "express";
import { createServer } from "http";

import "./server/core/db";
import createRoutes from "./server/core/routes";
import createSocket from "./server/core/socket";

const port = (process.env.PORT || 3003);
const app = express();
const http = createServer(app);
const io = createSocket(http);

createRoutes(app, io);

http.listen(port, () => {
  console.log(`Server: http://localhost:${port}`);
});
