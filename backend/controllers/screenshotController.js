const { getManaBounding } = require("../services/manaBounding")

const handleScreenshot = (buffer) => {
    const manaRect = getManaBounding(buffer)

    return {
        manaRect
    }    
}

module.exports = {
    handleScreenshot
}