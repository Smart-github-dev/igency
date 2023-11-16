import { settings } from "../root/settings/settings.js"

import { buttons } from "./ui/buttons.js"

import { playerdisplay } from "./ui/playerdisplay.js"

import { animations } from "./ui/animations.js"

let home = {
    playerImages: [],
    generate: function () {
        console.log("%c[home.js] Running home.generate()...", "color: #0074ff")
        document.querySelector("#version").innerHTML = `Version ${settings.version}`
        buttons.active()
        playerdisplay.active()
        animations.activate()
    }
}

home.generate()

export { home }