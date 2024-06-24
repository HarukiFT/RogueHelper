const { manaCountour } = require("../ml/manaBar");

module.exports = (socket) => {
    socket.on('screenshot', (buffer) => {
        console.log(buffer)
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
}