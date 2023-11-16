import { server } from "../../root/server/server.js";

import { settings } from "../../root/settings/settings.js";

import { joysticks } from "../ui/joysticks.js";

let input = {
  keys: [],
  touch: {
    left: {
      active: false,
      start: {
        x: null,
        y: null,
      },
      move: {
        x: null,
        y: null,
      },
    },
    right: {
      active: false,
      start: {
        x: null,
        y: null,
      },
      move: {
        x: null,
        y: null,
      },
    },
  },
  mouse: {
    down: false,
    x: null,
    y: null,
  },
  events: function () {
    window.addEventListener(
      "touchstart",
      (event) => {
        event.preventDefault();
        let touchOne = null;
        let touchTwo = null;
        if (event.touches.length >= 2) {
          touchTwo = event.touches[1];
          if (touchTwo.clientX <= window.innerWidth / settings.quality / 2) {
            input.touch.left.active = true;
            input.touch.left.start.x = touchTwo.clientX * settings.quality;
            input.touch.left.start.y = touchTwo.clientY * settings.quality;
            input.touch.left.move.x = touchTwo.clientX * settings.quality;
            input.touch.left.move.y = touchTwo.clientY * settings.quality;
          } else {
            input.touch.right.active = true;
            input.touch.right.start.x = touchTwo.clientX * settings.quality;
            input.touch.right.start.y = touchTwo.clientY * settings.quality;
            input.touch.right.move.x = touchTwo.clientX * settings.quality;
            input.touch.right.move.y = touchTwo.clientY * settings.quality;
          }
        } else {
          touchOne = event.touches[0];
          if (touchOne.clientX <= window.innerWidth / settings.quality / 2) {
            input.touch.left.active = true;
            input.touch.left.start.x = touchOne.clientX * settings.quality;
            input.touch.left.start.y = touchOne.clientY * settings.quality;
            input.touch.left.move.x = touchOne.clientX * settings.quality;
            input.touch.left.move.y = touchOne.clientY * settings.quality;
          } else {
            input.touch.right.active = true;
            input.touch.right.start.x = touchOne.clientX * settings.quality;
            input.touch.right.start.y = touchOne.clientY * settings.quality;
            input.touch.right.move.x = touchOne.clientX * settings.quality;
            input.touch.right.move.y = touchOne.clientY * settings.quality;
          }
        }
      },
      { passive: false }
    );
    window.addEventListener(
      "touchmove",
      (event) => {
        event.preventDefault();
        let touchOne = null;
        let touchTwo = null;
        if (event.touches.length >= 2) {
          touchOne = event.touches[0];
          touchTwo = event.touches[1];
          if (touchOne.clientX <= window.innerWidth / settings.quality / 2) {
            input.touch.left.move.x = touchOne.clientX * settings.quality;
            input.touch.left.move.y = touchOne.clientY * settings.quality;
          }
          if (touchOne.clientX > window.innerWidth / settings.quality / 2) {
            input.touch.right.move.x = touchOne.clientX * settings.quality;
            input.touch.right.move.y = touchOne.clientY * settings.quality;
          }
          if (touchTwo) {
            if (touchTwo.clientX <= window.innerWidth / settings.quality / 2) {
              input.touch.left.move.x = touchTwo.clientX * settings.quality;
              input.touch.left.move.y = touchTwo.clientY * settings.quality;
            }
            if (touchTwo.clientX > window.innerWidth / settings.quality / 2) {
              input.touch.right.move.x = touchTwo.clientX * settings.quality;
              input.touch.right.move.y = touchTwo.clientY * settings.quality;
            }
          }
        } else {
          touchOne = event.changedTouches[0];
          if (touchOne.clientX <= window.innerWidth / settings.quality / 2) {
            input.touch.left.move.x = touchOne.clientX * settings.quality;
            input.touch.left.move.y = touchOne.clientY * settings.quality;
          } else {
            input.touch.right.move.x = touchOne.clientX * settings.quality;
            input.touch.right.move.y = touchOne.clientY * settings.quality;
          }
        }
      },
      { passive: false }
    );
    window.addEventListener(
      "touchend",
      (event) => {
        event.preventDefault();
        let touch = null;
        if (event.touches.length > 0) {
          touch = event.touches[0];
          if (touch.clientX <= window.innerWidth / settings.quality / 2) {
            input.touch.right.active = false;
            input.touch.right.start.x = null;
            input.touch.right.start.y = null;
            input.touch.right.move.x = null;
            input.touch.right.move.y = null;
          } else {
            input.touch.left.active = false;
            input.touch.left.start.x = null;
            input.touch.left.start.y = null;
            input.touch.left.move.x = null;
            input.touch.left.move.y = null;
          }
        } else {
          input.touch.left.active = false;
          input.touch.right.active = false;
          input.touch.left.start.x = null;
          input.touch.left.start.y = null;
          input.touch.right.start.x = null;
          input.touch.right.start.y = null;
          input.touch.left.move.x = null;
          input.touch.left.move.y = null;
          input.touch.right.move.x = null;
          input.touch.right.move.y = null;
        }
        let message = {
          type: "stop_move",
          data: {
            id: settings.id,
            direction: [],
            hit: false,
          },
        };
        server.send(message);
      },
      { passive: false }
    );
    window.addEventListener(
      "dbclick",
      (event) => {
        event.preventDefault();
      },
      { passive: false }
    );
    window.addEventListener("mousemove", (event) => {
      input.mouse.x = event.clientX * settings.quality - window.innerWidth / 2;
      input.mouse.y = event.clientY * settings.quality - window.innerHeight / 2;
      let message = {
        type: "update_mouse",
        data: {
          id: settings.id,
          mouse: input.mouse,
        },
      };
      server.send(message);
    });
    window.addEventListener(
      "mousedown",
      (event) => {
        event.preventDefault();
        input.mouse.down = true;
        let message = {
          type: "update_mouse",
          data: {
            id: settings.id,
            mouse: input.mouse,
          },
        };
        server.send(message);
      },
      { passive: false }
    );
    window.addEventListener("mouseup", (event) => {
      input.mouse.down = false;
      let message = {
        type: "update_mouse",
        data: {
          id: settings.id,
          mouse: input.mouse,
        },
      };
      server.send(message);
    });
    window.addEventListener("keydown", (event) => {
      if (!input.keys.includes(event.key.toLowerCase())) {
        input.keys.push(event.key.toLowerCase());
      }
      let direction = [];
      if (input.keys.includes(settings.game.keybinds.up)) {
        direction.push(270);
      }
      if (input.keys.includes(settings.game.keybinds.down)) {
        direction.push(90);
      }
      if (input.keys.includes(settings.game.keybinds.left)) {
        direction.push(180);
      }
      if (input.keys.includes(settings.game.keybinds.right)) {
        direction.push(0);
      }
      if (direction.length !== 0) {
        let message = {
          type: "update_move",
          data: {
            id: settings.id,
            direction: direction,
          },
        };
        server.send(message);
      }
      let selection = [];
      if (input.keys.includes(settings.game.keybinds.slots.one)) {
        selection.push(1);
      }
      if (input.keys.includes(settings.game.keybinds.slots.two)) {
        selection.push(2);
      }
      if (input.keys.includes(settings.game.keybinds.slots.three)) {
        selection.push(3);
      }
      if (input.keys.includes(settings.game.keybinds.slots.four)) {
        selection.push(4);
      }
      if (input.keys.includes(settings.game.keybinds.slots.five)) {
        selection.push(5);
      }
      if (input.keys.includes(settings.game.keybinds.slots.six)) {
        selection.push(6);
      }
      if (selection.length === 0) {
        return;
      } else {
        let message = {
          type: "update_selection",
          data: {
            id: settings.id,
            selection: selection,
          },
        };
        server.send(message);
      }
    });
    window.addEventListener("keyup", (event) => {
      let newKeys = [];
      input.keys.forEach(function (object) {
        if (object !== event.key) {
          newKeys.push(object);
        }
      });
      input.keys = newKeys;
      let direction = [];
      if (input.keys.includes(settings.game.keybinds.up)) {
        direction.push(270);
      }
      if (input.keys.includes(settings.game.keybinds.down)) {
        direction.push(90);
      }
      if (input.keys.includes(settings.game.keybinds.left)) {
        direction.push(180);
      }
      if (input.keys.includes(settings.game.keybinds.right)) {
        direction.push(0);
      }
      let message = {
        type: "stop_move",
        data: {
          id: settings.id,
          direction: direction,
        },
      };
      server.send(message);
    });
  },
};

export { input };
