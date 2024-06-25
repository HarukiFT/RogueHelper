const { doCollibrate } = require("../controllers/screenshotController");

module.exports = (socket) => {
    socket.on('collibrate', (buffer) => {
        const payload = doCollibrate(buffer)

        socket.emit('collibrate', payload)
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
}