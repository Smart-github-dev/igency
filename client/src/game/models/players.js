import { render } from "../system/render.js"

import { data } from "../data/data.js"

import { settings } from "../../root/settings/settings.js"

let players = {
    renderBody: function () {
        data.players.forEach(function (player) {
            data.images.forEach(function (image) {
                if (player.skin.body === image.id) {
                    render.image(image, player.body.x, player.body.y, data.rules.players.body.size, data.rules.players.body.size, player.angle)
                    if (settings.roles.includes("Developer") === true && settings.developer.hitboxes.enabled === true) {
                        render.rectangle(player.body.x - data.rules.players.body.size / 2, player.body.y - data.rules.players.body.size / 2, data.rules.players.body.size, data.rules.players.body.size, null, settings.developer.hitboxes.color, settings.developer.hitboxes.size)
                    	render.circle(player.body.x, player.body.y, data.rules.players.body.size / 2, null, settings.developer.hitboxes.color, settings.developer.hitboxes.size)
                    }
                }
            })
        })
    },
    renderHands: function () {
        data.players.forEach(function (player) {
            data.images.forEach(function (image) {
                if (player.skin.hands.left === image.id) {
                    render.image(image, player.hands.left.x, player.hands.left.y, data.rules.players.hands.left.size, data.rules.players.hands.left.size, player.angle)
                    if (settings.roles.includes("Developer") === true && settings.developer.hitboxes.enabled === true) {
                        render.rectangle(player.hands.left.x - data.rules.players.hands.left.size / 2, player.hands.left.y - data.rules.players.hands.left.size / 2, data.rules.players.hands.left.size, data.rules.players.hands.left.size, null, settings.developer.hitboxes.color, settings.developer.hitboxes.size)
                        render.circle(player.hands.left.x, player.hands.left.y, data.rules.players.hands.left.size / 2, null, settings.developer.hitboxes.color, settings.developer.hitboxes.size)
                    }
                }
            })
            data.images.forEach(function (image) {
                if (player.skin.hands.right === image.id) {
                    render.image(image, player.hands.right.x, player.hands.right.y, data.rules.players.hands.right.size, data.rules.players.hands.right.size, player.angle)
                    if (settings.roles.includes("Developer") === true && settings.developer.hitboxes.enabled === true) {
                        render.rectangle(player.hands.right.x - data.rules.players.hands.right.size / 2, player.hands.right.y - data.rules.players.hands.right.size / 2, data.rules.players.hands.right.size, data.rules.players.hands.right.size, null, settings.developer.hitboxes.color, settings.developer.hitboxes.size)
                        render.circle(player.hands.right.x, player.hands.right.y, data.rules.players.hands.right.size / 2, null, settings.developer.hitboxes.color, settings.developer.hitboxes.size)
                    }
                }
            })
        })
    }
}

export { players }