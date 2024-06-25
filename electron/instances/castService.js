const screenshotDesktop = require("screenshot-desktop")
const { io } = require("socket.io-client")
const { EventEmitter } = require('events') 

class ClientCast {
    #intervalId
    #eventEmitter = new EventEmitter();

    constructor (connectionString) {
        this.connection = io(connectionString)
        
        this.connection.on('connect', () => {
            // this.loop()
        })
        
        this.connection.on('collibrate', (data) => {
            this.#handleCollibrate(data)
        })
    }

    #handleCollibrate(payload) {
       this.#eventEmitter.emit('manaRect', payload.manaRect)
       this.#eventEmitter.emit('hpRect', payload.hpRect)
    }
    
    on(action, callback) {
        this.#eventEmitter.on(action, callback)
    }

    collibrate() {
        this.#eventEmitter.emit('hide')
        screenshotDesktop({format: "png"}).then((buffer) => {
            this.connection.emit('collibrate', buffer)
            console.log('emitted')

            this.#eventEmitter.emit('show')
        }).catch(err => {
            console.log(err)
        })
    }
}

module.exports = {
    ClientCast
}