import { game } from "../../game/game.js"

import { menu } from "./menu.js"

let buttons = {
    active: function () {
        _("#play").onclick = () => {
            menu.get()
            menu.update()
            game.run()
        }
        _("#settings").onclick = () => {
            _("#menu").style.display = "block"
            _("#settingsmenu").style.display = "grid"
            menu.get()
        }
        _("#menuclose").onclick = () => {
            _("#menu").style.display = "none"
            _("#settingsmenu").style.display = "none"
            menu.update()
        }
        function _(css) {
            return document.querySelector(css)
        }
    }
}

export { buttons }