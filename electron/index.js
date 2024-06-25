const { app } = require('electron')
const { ClientCast } = require('./instances/castService')
const manaWindow = require('./windows/manaWindow')

let castObject;

const initCast = () => {
  castObject = new ClientCast('http://localhost:4000')
}

app.whenReady().then(() => {
  initCast()

  manaWindow(castObject)  
})