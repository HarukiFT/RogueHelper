const { app, BrowserWindow } = require('electron')
const { io } = require('socket.io-client')
const { ClientCast } = require('./services/castService')

let castObject;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })
}

app.whenReady().then(() => {
  castObject = new ClientCast('http://localhost:4000')

  createWindow()
})