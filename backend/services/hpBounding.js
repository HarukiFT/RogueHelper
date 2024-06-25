const { hpCountour } = require("../ml/healthBar")

const getHpBounding = (buffer) => {
    const contour = hpCountour(buffer)
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
    getHpBounding
}