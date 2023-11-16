import { data } from "../data/data.js"

import { settings } from "../../root/settings/settings.js"

import { input } from "../system/input.js"

import { render } from "../system/render.js"

import { server } from "../../root/server/server.js"

let joysticks = {
    calculate: function () {
        if (input.touch.left.active === true) {
        	let deltaX = input.touch.left.start.x - input.touch.left.move.x
        	let deltaY = input.touch.left.start.y - input.touch.left.move.y
        	let angleInRadians = Math.atan2(deltaY, deltaX)
        	let angleInDegrees = (angleInRadians * 180) / Math.PI + 180
        	let direction = []
        	direction.push(angleInDegrees)
        	let message = {
            	type: "update_move",
            	data: {
                	id: settings.id,
                	direction: direction
            	}
        	}
        	server.send(message)
        }
        if (input.touch.right.active === true) {
            let hit = false
        	let deltaX = input.touch.right.start.x - input.touch.right.move.x
        	let deltaY = input.touch.right.start.y - input.touch.right.move.y
            let distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)
        	let angleInRadians = Math.atan2(deltaY, deltaX) - Math.PI * 1.5
        	let angleInDegrees = (angleInRadians * 180) / Math.PI + 180
            if (distance >= settings.game.ui.joysticks.sensitivity) {
                hit = true
            }
            let message = {
                type: "update_angle",
                data: {
                    id: settings.id,
                    angle: angleInRadians,
                    hit: hit
                }
            }
            server.send(message)
        }
    },
    render: function () {
        let deltaXLeft = input.touch.left.start.x - input.touch.left.move.x
        let deltaYLeft = input.touch.left.start.y - input.touch.left.move.y
        let angleInRadiansLeft = Math.atan2(deltaYLeft, deltaXLeft) + Math.PI
        let angleInDegreesLeft = (angleInRadiansLeft * 180)
        let distanceLeft = Math.sqrt(deltaXLeft ** 2 + deltaYLeft ** 2)
        if (distanceLeft > settings.game.ui.joysticks.base.size * settings.quality / 2) {
            input.touch.left.move.x = input.touch.left.start.x + settings.game.ui.joysticks.base.size * settings.quality / 2 * Math.cos(angleInRadiansLeft)
            input.touch.left.move.y = input.touch.left.start.y + settings.game.ui.joysticks.base.size * settings.quality / 2 * Math.sin(angleInRadiansLeft)
        }
        let deltaXRight = input.touch.right.start.x - input.touch.right.move.x
        let deltaYRight = input.touch.right.start.y - input.touch.right.move.y
        let angleInRadiansRight = Math.atan2(deltaYRight, deltaXRight) + Math.PI
        let angleInDegreesRight = (angleInRadiansRight * 180)
        let distanceRight = Math.sqrt(deltaXRight ** 2 + deltaYRight ** 2)
        if (distanceRight > settings.game.ui.joysticks.base.size * settings.quality / 2) {
            input.touch.right.move.x = input.touch.right.start.x + settings.game.ui.joysticks.base.size * settings.quality / 2 * Math.cos(angleInRadiansRight)
            input.touch.right.move.y = input.touch.right.start.y + settings.game.ui.joysticks.base.size * settings.quality / 2 * Math.sin(angleInRadiansRight)
        }
        data.images.forEach(function (object) {
            if (object.id === "joystick_base" && object.type === "joystick") {
                if (input.touch.left.start.x !== null && input.touch.left.start.y !== null) {
            		render.image(object, input.touch.left.start.x - settings.game.ui.joysticks.base.size * settings.quality / 2, input.touch.left.start.y - settings.game.ui.joysticks.base.size * settings.quality / 2, settings.game.ui.joysticks.base.size * settings.quality, settings.game.ui.joysticks.base.size * settings.quality, null, true, true)
                }
                if (input.touch.right.start.x !== null && input.touch.right.start.y !== null) {
            		render.image(object, input.touch.right.start.x - settings.game.ui.joysticks.base.size * settings.quality / 2, input.touch.right.start.y - settings.game.ui.joysticks.base.size * settings.quality / 2, settings.game.ui.joysticks.base.size * settings.quality, settings.game.ui.joysticks.base.size * settings.quality, null, true, true)
                }
            }
            if (object.id === "joystick_stick" && object.type === "joystick") {
                if (input.touch.left.move.x !== null && input.touch.left.move.y !== null) {
            		render.image(object, input.touch.left.move.x - settings.game.ui.joysticks.stick.size * settings.quality / 2, input.touch.left.move.y - settings.game.ui.joysticks.stick.size * settings.quality / 2, settings.game.ui.joysticks.stick.size * settings.quality, settings.game.ui.joysticks.stick.size * settings.quality, null, true, true)
                }
                if (input.touch.right.move.x !== null && input.touch.right.move.y !== null) {
            		render.image(object, input.touch.right.move.x - settings.game.ui.joysticks.stick.size * settings.quality / 2, input.touch.right.move.y - settings.game.ui.joysticks.stick.size * settings.quality / 2, settings.game.ui.joysticks.stick.size * settings.quality, settings.game.ui.joysticks.stick.size * settings.quality, null, true, true)
                }
            }
        })
    }
}

export { joysticks }