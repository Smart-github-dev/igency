function probability(percent) {
    let decimalProbability = percent / 100
    let random = Math.random()
    if (random < decimalProbability) {
        return true
    } 
    else {
        return false
    }
}

module.exports = probability