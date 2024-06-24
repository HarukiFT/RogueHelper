const cv = require('opencv4nodejs')
const screenshot = require('screenshot-desktop')

const manaCountour = (buffer) => {
    const img = cv.imdecode(buffer)

    const optimalImage = img.cvtColor(cv.COLOR_HSV2BGR).gaussianBlur(new cv.Size(5, 5), 1)
    const lowerBlue = new cv.Vec(100, 80, 0);
    const upperBlue = new cv.Vec(150, 150, 100);
    const mask = optimalImage.inRange(lowerBlue, upperBlue);

    const kernel = new cv.Mat(3, 3, cv.CV_8U, 1);

    const cannyCorners = mask.canny(255, 255)
    const dilated = cannyCorners.dilate(kernel);
    const closed = dilated.morphologyEx(kernel, cv.MORPH_CLOSE);

    const contours = closed.findContours(cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)

    // cv.imshow('Test', closed)
    // cv.waitKey(0)
    
    return contours.filter(contour => {
        const rect = contour.boundingRect()
        const aspectRatio = rect.width / rect.height
        const square = rect.width * rect.height

        return (aspectRatio <= .3 && square > 5000)
    }).sort((a, b) => {
        const aRect = a.boundingRect()
        const bRect = b.boundingRect()

        return (aRect.x > bRect.x)
    })[0]
}

module.exports = {
    manaCountour
}


