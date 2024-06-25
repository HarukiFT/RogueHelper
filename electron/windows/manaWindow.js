const { BrowserWindow } = require("electron")

const createWindow = (cast) => {
    const window = new BrowserWindow({
        width: 0,
        height: 0,
        frame: false,
        alwaysOnTop: true,
        transparent: true
    })
    
    window.loadFile('index.html')

    cast.on('manaRect', (rect) => {
        const windowBounds = window.getBounds()
        const magnitude = Math.sqrt(Math.pow((rect.left - windowBounds.x), 2) + Math.pow((rect.top - windowBounds.y), 2))
        if (magnitude < 10) { return }
        window.setBounds({
            x: rect.left,
            y: rect.top,
            width: rect.right - rect.left,
            height: rect.bottom - rect.top
        })
    })
}

module.exports = createWindow