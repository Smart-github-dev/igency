let settings = {
    id: function (length) {
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        let randomId = ""
        for (let i = 0; i < length; i++) {
            let randomIndex = Math.floor(Math.random() * characters.length)
            randomId += characters.charAt(randomIndex)
        }
        return randomId
    }
}

module.exports = settings