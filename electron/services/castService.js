const screenshotDesktop = require("screenshot-desktop")
const { io } = require("socket.io-client")

class ClientCast {
    #intervalId

    constructor (connectionString) {
        this.connection = io(connectionString)
        
        
        this.connection.on('connect', () => {
            this.loop()
        })
    }
    
    shot() {
        screenshotDesktop({format: "jpeg"}).then((buffer) => {
            this.connection.emit('screenshot', buffer)
        }).catch(err => {
            console.log(err)
        })
    }

    loop() {
        setInterval(() => {
            this.shot()
        }, (1000));
    }
}

module.exports = {
    ClientCast
}