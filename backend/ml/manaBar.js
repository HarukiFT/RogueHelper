const cv = require('opencv4nodejs')
const screenshot = require('screenshot-desktop')

const manaCountour = (img) => {
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

setInterval(() => {
    screenshot({ format: 'png' }).then(image => {
        const img = cv.imdecode(image);
    
        const manaBar = manaCountour(img)
        if (!manaBar) return
        const rect = manaBar.boundingRect()
        img.drawRectangle(
            new cv.Point2(rect.x, rect.y),
            new cv.Point2(rect.x + rect.width, rect.y + rect.height),
            new cv.Vec3(255, 255, 0),
            2,
            cv.LINE_8
        )
    
        cv.imshow('Test', img)
        cv.waitKey(10)
    }).catch(err => {
        console.log(err)
    })
}, 10);


