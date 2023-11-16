import { settings } from "../../root/settings/settings.js"

import { data } from "../../game/data/data.js"

let playerdisplay = {
    active: function () {
        let ctx = document.querySelector("#playerdisplay").getContext("2d")
        let display = document.querySelector("#playerdisplay")
        display.width = 500
        display.height = 500
        let w = display.width
        let h = display.height
        ctx.clearRect(0, 0, w, h)
        data.images.forEach(function (object) {
            if (object.id === settings.game.player.skin.body) {
                ctx.drawImage(object, w / 2 - 100, h / 2 - 100, 70 * 3, 70 * 3)
            }
        })
        data.images.forEach(function (object) {
            if (object.id === settings.game.player.skin.hands.left) {
                ctx.drawImage(object, w / 2 - 100 - 13.5, h / 2 - 100 - 15, 27 * 3, 27 * 3)
            }
        })
        data.images.forEach(function (object) {
            if (object.id === settings.game.player.skin.hands.right) {
                ctx.drawImage(object, w / 2 + 50 - 13.5, h / 2 - 100 - 15, 27 * 3, 27 * 3)
            }
        })
        requestAnimationFrame(() => {
            playerdisplay.active()
        })
    }
}

export { playerdisplay }