const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const clientSocket = require('./socket/clientSocket');
const { config } = require('dotenv');
const path = require('path');

config()

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { maxHttpBufferSize: Infinity });

const PORT = process.env.PORT || 4000;

io.on('connection', clientSocket);

if (!process.env.IS_DEV) {
    app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
    });
}


server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
