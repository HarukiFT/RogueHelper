const { config } = require("dotenv")
const { BrowserWindow } = require("electron")
const endpoints = require("../config/endpoints")
config()

const createWindow = (cast) => {
    const window = new BrowserWindow({
        width: 0,
        height: 0,
        frame: false,
        alwaysOnTop: true,
        transparent: true,
        focusable: false,
        resizable: false,
    })

    window.loadURL(`${endpoints.reactEndpoint}/manabar`)
    cast.on('manaRect', (rect) => {
        if (!rect) { return }
        const windowBounds = window.getBounds()
        const magnitude = Math.sqrt(Math.pow((rect.left - windowBounds.x), 2) + Math.pow((rect.top - windowBounds.y), 2))
        if (magnitude < 20) { return }
        window.setBounds({
            x: rect.left,
            y: rect.top,
            width: rect.right - rect.left,
            height: rect.bottom - rect.top
        })
    })

    cast.on('hide', () => {
        window.setOpacity(0)
    })

    cast.on('show', () => {
        window.setOpacity(1)
    })
}

module.exports = createWindow