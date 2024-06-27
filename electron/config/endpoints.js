const { config } = require("dotenv");

config()

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    endpoint: isDev ? 'http://localhost:4000' : 'http://147.45.251.252:3012',
    reactEndpoint: isDev ? 'http://localhost:3000' : 'http://147.45.251.252:3012'
}