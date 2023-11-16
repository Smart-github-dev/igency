let collision = {
    circleXcircle: function (x1, y1, radius1, x2, y2, radius2) {
        let dx = x1 - x2
        let dy = y1 - y2
        let distance = Math.sqrt(dx * dx + dy * dy)
        return distance < radius1 + radius2
    }
}

module.exports = collision