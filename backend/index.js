require('dotenv').config();
const router = require('./src/routes/index');
const express = require('express');
const app = express();
const port = 5000;

const http = require("http");
const { Server } = require("socket.io");

app.use(express.json());

const cors = require('cors')
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
require("./src/socket")(io);

app.use(cors());
app.use('/api/v1/', router);

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'))

server.listen(port, () => console.log(`server running on port: ${port}`))
