const { handleScreenshot } = require("../controllers/screenshotController");

module.exports = (socket) => {
    socket.on('screenshot', (buffer) => {
        const payload = handleScreenshot(buffer)

        socket.emit('payload', payload)
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
}