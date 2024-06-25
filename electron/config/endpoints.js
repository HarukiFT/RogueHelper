const { app } = require("electron");

module.exports = {
    endpoint: !app.isPackaged ? 'http://localhost:4000' : 'http://147.45.251.252:3012',
    reactEndpoint: !app.isPackaged ? 'http://localhost:3000' : 'http://147.45.251.252:3012'
}