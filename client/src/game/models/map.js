import { render } from "../system/render.js"

import { data } from "../data/data.js"

import { settings } from "../../root/settings/settings.js"

let map = {
    render: function () {
        for (let x = 0; x < data.map.length; x++) {
            for (let y = 0; y < data.map[x].length; y++) {
                if (data.map[y][x] === 0) {
                    data.images.forEach(function (image) {
                        if (image.id === "grass_tile" && image.type === "tile") {
                            render.image(image, x * data.rules.map.tiles.size, y * data.rules.map.tiles.size, data.rules.map.tiles.size, data.rules.map.tiles.size)
                            if (settings.roles.includes("Developer") === true && settings.developer.hitboxes.enabled === true) {
                                render.rectangle(x * data.rules.map.tiles.size, y * data.rules.map.tiles.size, data.rules.map.tiles.size, data.rules.map.tiles.size, null, settings.developer.hitboxes.color, settings.developer.hitboxes.size)
                            }
                        }
                    })
                }
            }
        }
    }
}

export { map }