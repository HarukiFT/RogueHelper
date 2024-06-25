const { app, Menu, Tray } = require('electron')
const { ClientCast } = require('./instances/castService')
const manaWindow = require('./windows/manaWindow')
const endpoints = require('./config/endpoints')

let castObject;

const initCast = () => {
  castObject = new ClientCast(endpoints.endpoint)
}

const contextMenu = Menu.buildFromTemplate([
  {
    label: 'Collibrate', click: () => {
      castObject.collibrate()
    }
  },
  { type: 'separator' },
  { label: 'Quit', click: () => app.quit() }
]);



app.whenReady().then(() => {
  initCast()

  const tray = new Tray('assets/tray-icon.png')
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)

  manaWindow(castObject)
})