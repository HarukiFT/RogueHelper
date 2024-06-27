const screenshot = require('desktop-screenshot');
const { io } = require("socket.io-client")
const { EventEmitter } = require('events'); 
const { BrowserWindow } = require("electron");
const path = require("path");
const fs = require('fs')

function takeScreenshotAndGetBuffer() {
    return new Promise((resolve, reject) => {
      const screenshotPath = path.join(__dirname, `${Date.now().toLocaleString()}.png`);
      
      // Создаем скриншот
      screenshot(screenshotPath, { format: 'png' }, (error) => {
        if (error) {
          return reject(error);
        }
        
        // Читаем файл и возвращаем буфер
        fs.readFile(screenshotPath, (err, data) => {
          if (err) {
            return reject(err);
          }
          resolve(data);
        });
      });
    });
  }

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

            this.#eventEmitter.emit('show')
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
        const batPath = path.join(process.resourcesPath, 'win32', 'screenCapture_1.3.2.bat');
        takeScreenshotAndGetBuffer().then((buffer) => {
            this.connection.emit('collibrate', buffer)
        }).catch(err => {
            const errorWindow = new BrowserWindow({
                width: 800,
                height: 600,
                title: 'Error'
              });
        
              errorWindow.loadURL(`data:text/html,<h1>Error</h1><p>${err.message}</p>`)
        })
    }
}

module.exports = {
    ClientCast
}