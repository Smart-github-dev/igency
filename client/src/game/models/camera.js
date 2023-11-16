import { data } from "../data/data.js"

import { render } from "../system/render.js"

import { settings } from "../../root/settings/settings.js"

let camera = {
    x: null,
    y: null,
    target: {
        x: null,
        y: null
    },
    start: function () {
        let player = null
        data.players.forEach(function (object) {
            if (object.id === settings.id) {
                player = object
            }
        })
        if (player === null) {
            return
        }
        this.target.x = player.body.x
        this.target.y = player.body.y
        this.x = render.unity(player.body.x) - window.innerWidth / 2
        this.y = render.unity(player.body.y) - window.innerHeight / 2
        render.ctx.translate(- this.x, - this.y)
    },
    stop: function () {
        render.ctx.translate(this.x, this.y)
    }
}

export { camera }