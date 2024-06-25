const { manaCountour } = require("../ml/manaBar")

const getManaBounding = (buffer) => {
    const contour = manaCountour(buffer)
    if (!contour) return

    const rect = contour.boundingRect()

    return {
        left: rect.x,
        right: rect.x + rect.width,
        top: rect.y,
        bottom: rect.y + rect.height
    }
}

module.exports  = {
    getManaBounding
}