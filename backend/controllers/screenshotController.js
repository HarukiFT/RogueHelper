const { getHpBounding } = require("../services/hpBounding")
const { getManaBounding } = require("../services/manaBounding")

const doCollibrate = (buffer) => {
    const manaRect = getManaBounding(buffer)
    const hpRect = getHpBounding(buffer)

    return {
        manaRect,
        hpRect
    }
}

module.exports = {
    doCollibrate
}