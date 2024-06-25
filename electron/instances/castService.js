const screenshotDesktop = require("screenshot-desktop")
const { io } = require("socket.io-client")
const { EventEmitter } = require('events') 

class ClientCast {
    #intervalId
    #eventEmitter = new EventEmitter();

    constructor (connectionString) {
        this.connection = io(connectionString)
        
        this.connection.on('connect', () => {
            this.loop()
        })
        
        this.connection.on('payload', (data) => {
            this.#handlePayload(data)
        })
    }

    #handlePayload(payload) {
        if (payload.manaRect) {
            this.#eventEmitter.emit('manaRect', payload.manaRect)
        }
    }
    
    on(action, callback) {
        this.#eventEmitter.on(action, callback)
    }

    shot() {
        this.#eventEmitter.emit('hide')
        screenshotDesktop({format: "jpeg"}).then((buffer) => {
            this.connection.emit('screenshot', buffer)
        }).catch(err => {
            console.log(err)
        })
        this.#eventEmitter.emit('show')
    }

    loop() {
        setInterval(() => {
            this.shot()
        }, (100));
    }
}

module.exports = {
    ClientCast
}