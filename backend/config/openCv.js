const { config } = require('dotenv');

config()

let opencv;

if (!process.env.IS_DEV) {
  opencv = require('@u4/opencv4nodejs');
} else {
  opencv = require('opencv4nodejs');
}

module.exports = opencv;