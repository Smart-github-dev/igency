import { data } from "../data/data.js"

import { settings } from "../../root/settings/settings.js"

import { render } from "../system/render.js"

let healthbar = {
    render: function () {
        data.players.forEach(function (object) {
            if (object.id === settings.id) {
                data.images.forEach(function (image) {
                    if (image.id === "healthbar_base") {
                        render.image(image, settings.game.ui.healthbar.base.x * settings.quality, settings.game.ui.healthbar.base.y * settings.quality, settings.game.ui.healthbar.base.width * 100 * settings.quality, settings.game.ui.healthbar.base.height * settings.quality, null, true, true)
                    }
                })
                data.images.forEach(function (image) {
                    if (image.id === "healthbar_detail") {
                        render.image(image, settings.game.ui.healthbar.detail.x * settings.quality, settings.game.ui.healthbar.detail.y * settings.quality, settings.game.ui.healthbar.detail.width * object.health * settings.quality, settings.game.ui.healthbar.detail.height * settings.quality, null, true, true)
                    }
                })
            }
        })
    }
}

export { healthbar }