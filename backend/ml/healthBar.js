const opencv = require("../config/openCv")

const cv = opencv

const hpCountour = (buffer) => {
    const img = cv.imdecode(buffer)

    const optimalImage = img.cvtColor(cv.COLOR_BGR2RGB)
    const lowerBlue = new cv.Vec(201, 151, 100)
    const upperBlue = new cv.Vec(230, 171, 113)
    const mask = optimalImage.inRange(lowerBlue, upperBlue);

    const kernel = new cv.Mat(3, 3, cv.CV_8U, 1)

    const cannyCorners = mask.canny(255, 255)
    const dilated = cannyCorners.dilate(kernel)
    const closed = dilated.morphologyEx(kernel, cv.MORPH_CLOSE)


    const contours = closed.findContours(cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)

    return contours.filter(contour => {
        const rect = contour.boundingRect()
        const aspectRatio = rect.width / rect.height
        const square = rect.width * rect.height

        return (aspectRatio >= 5 && square > 2500)
    }).sort((a, b) => {
        const aRect = a.boundingRect()
        const bRect = b.boundingRect()

        return (aRect.width * aRect.height < bRect.width * bRect.height)
    })[0]
}

module.exports = {
    hpCountour
}
