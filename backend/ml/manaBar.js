const cv = require('opencv4nodejs')
const screenshot = require('screenshot-desktop')

const manaCountour = (buffer) => {
    const img = cv.imdecode(buffer)

    const optimalImage = img.cvtColor(cv.COLOR_HSV2BGR).gaussianBlur(new cv.Size(1, 1), 1)
    const lowerBlue = new cv.Vec(160, 50, 50);
    const upperBlue = new cv.Vec(250, 255, 255);
    const mask = optimalImage.inRange(lowerBlue, upperBlue);

    const kernel = new cv.Mat(3, 3, cv.CV_8U, 1);

    const cannyCorners = mask.canny(255, 255)
    const dilated = cannyCorners.dilate(kernel);
    const closed = dilated.morphologyEx(kernel, cv.MORPH_CLOSE);

    const contours = closed.findContours(cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)
    
    return contours.filter(contour => {
        const rect = contour.boundingRect()
        const aspectRatio = rect.width / rect.height
        const square = rect.width * rect.height

        return (aspectRatio <= .3 && square > 2500 && rect.height < closed.rows / 2)
    }).sort((a, b) => {
        const aRect = a.boundingRect()
        const bRect = b.boundingRect()

        return (aRect.x > bRect.x)
    })[0]
}

module.exports = {
    manaCountour
}


