const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const clientSocket = require('./socket/clientSocket');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 4000;

io.on('connection', clientSocket);

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
