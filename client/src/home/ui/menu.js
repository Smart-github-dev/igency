import { settings } from "../../root/settings/settings.js"

let menu = {
    get: function () {
        _("#keybindsup").value = settings.game.keybinds.up
        _("#keybindsdown").value = settings.game.keybinds.down
        _("#keybindsleft").value = settings.game.keybinds.left
        _("#keybindsright").value = settings.game.keybinds.right
        _("#quality").value = settings.quality
        function _(element) {
            return document.querySelector(element)
        }
    },
    update: function () {
        let newSettings = settings
        newSettings.game.player.username = _("#username").value
        settings.quality = _("#quality").value
        window.innerWidth = settings.window.width * settings.quality
        window.innerHeight = settings.window.height * settings.quality
        _("#game").width = window.innerWidth
        _("#game").height = window.innerHeight
        settings.$(newSettings)
        console.log(settings)
        function _(element) {
            return document.querySelector(element)
        }

    }
}

export { menu }