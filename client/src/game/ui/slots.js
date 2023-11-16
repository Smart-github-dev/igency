import { data } from "../data/data.js";

import { settings } from "../../root/settings/settings.js";

import { render } from "../system/render.js";

import { input } from "../system/input.js";

import { server } from "../../root/server/server.js";

let slots = {
  calculate: function () {
    let message = {
      type: "update_selection",
      data: {
        id: settings.id,
        selection: [],
      },
    };
    if (
      inRect(
        input.touch.right.start.x,
        input.touch.right.start.y,
        settings.game.ui.slots.one.x * settings.quality,
        settings.game.ui.slots.one.y * settings.quality,
        settings.game.ui.slots.one.width * settings.quality,
        settings.game.ui.slots.one.height * settings.quality
      ) === true
    ) {
      message.data.selection.push(1);
    }
    if (
      inRect(
        input.touch.right.start.x,
        input.touch.right.start.y,
        settings.game.ui.slots.two.x * settings.quality,
        settings.game.ui.slots.two.y * settings.quality,
        settings.game.ui.slots.two.width * settings.quality,
        settings.game.ui.slots.two.height * settings.quality
      ) === true
    ) {
      message.data.selection.push(2);
    }
    if (
      inRect(
        input.touch.right.start.x,
        input.touch.right.start.y,
        settings.game.ui.slots.three.x * settings.quality,
        settings.game.ui.slots.three.y * settings.quality,
        settings.game.ui.slots.four.width * settings.quality,
        settings.game.ui.slots.three.height * settings.quality
      ) === true
    ) {
      message.data.selection.push(3);
    }
    if (
      inRect(
        input.touch.right.start.x,
        input.touch.right.start.y,
        settings.game.ui.slots.four.x * settings.quality,
        settings.game.ui.slots.four.y * settings.quality,
        settings.game.ui.slots.three.width * settings.quality,
        settings.game.ui.slots.four.height * settings.quality
      ) === true
    ) {
      message.data.selection.push(4);
    }
    if (
      inRect(
        input.touch.right.start.x,
        input.touch.right.start.y,
        settings.game.ui.slots.four.x * settings.quality,
        settings.game.ui.slots.four.y * settings.quality,
        settings.game.ui.slots.five.width * settings.quality,
        settings.game.ui.slots.four.height * settings.quality
      ) === true
    ) {
      message.data.selection.push(5);
    }
    if (
      inRect(
        input.touch.right.start.x,
        input.touch.right.start.y,
        settings.game.ui.slots.five.x * settings.quality,
        settings.game.ui.slots.five.y * settings.quality,
        settings.game.ui.slots.six.width * settings.quality,
        settings.game.ui.slots.five.height * settings.quality
      ) === true
    ) {
      message.data.selection.push(6);
    }
    if (message.data.selection.length !== 0) {
      server.send(message);
    }
    function inRect(x, y, rectX, rectY, rectWidth, rectHeight) {
      return (
        x >= rectX &&
        x <= rectX + rectWidth &&
        y >= rectY &&
        y <= rectY + rectHeight
      );
    }
  },
  render: function () {
    data.players.forEach(function (object) {
      object.slots.forEach(function (weapon) {
        data.images.forEach(function (image) {
          if (weapon.slotNumber === 1 && image.id === weapon.slot) {
            data.images.forEach(function (systemimage) {
              if (weapon.selected === false && systemimage.id === "slot") {
                render.image(
                  systemimage,
                  settings.game.ui.slots.one.x * settings.quality,
                  settings.game.ui.slots.one.y * settings.quality,
                  settings.game.ui.slots.one.width * settings.quality,
                  settings.game.ui.slots.one.height * settings.quality,
                  null,
                  true,
                  true
                );
              }
              if (
                weapon.selected === true &&
                systemimage.id === "selected_slot"
              ) {
                render.image(
                  systemimage,
                  settings.game.ui.slots.one.x * settings.quality,
                  settings.game.ui.slots.one.y * settings.quality,
                  settings.game.ui.slots.one.width * settings.quality,
                  settings.game.ui.slots.one.height * settings.quality,
                  null,
                  true,
                  true
                );
              }
            });
            render.image(
              image,
              settings.game.ui.slots.one.x * settings.quality,
              settings.game.ui.slots.one.y * settings.quality,
              settings.game.ui.slots.one.width * settings.quality,
              settings.game.ui.slots.one.height * settings.quality,
              null,
              true,
              true
            );
          }
          if (weapon.slotNumber === 2 && image.id === weapon.slot) {
            data.images.forEach(function (systemimage) {
              if (weapon.selected === false && systemimage.id === "slot") {
                render.image(
                  systemimage,
                  settings.game.ui.slots.two.x * settings.quality,
                  settings.game.ui.slots.two.y * settings.quality,
                  settings.game.ui.slots.two.width * settings.quality,
                  settings.game.ui.slots.two.height * settings.quality,
                  null,
                  true,
                  true
                );
              }
              if (
                weapon.selected === true &&
                systemimage.id === "selected_slot"
              ) {
                render.image(
                  systemimage,
                  settings.game.ui.slots.two.x * settings.quality,
                  settings.game.ui.slots.two.y * settings.quality,
                  settings.game.ui.slots.two.width * settings.quality,
                  settings.game.ui.slots.two.height * settings.quality,
                  null,
                  true,
                  true
                );
              }
            });
            render.image(
              image,
              settings.game.ui.slots.two.x * settings.quality,
              settings.game.ui.slots.two.y * settings.quality,
              settings.game.ui.slots.two.width * settings.quality,
              settings.game.ui.slots.two.height * settings.quality,
              null,
              true,
              true
            );
          }
          if (weapon.slotNumber === 3 && image.id === weapon.slot) {
            data.images.forEach(function (systemimage) {
              if (weapon.selected === false && systemimage.id === "slot") {
                render.image(
                  systemimage,
                  settings.game.ui.slots.three.x * settings.quality,
                  settings.game.ui.slots.three.y * settings.quality,
                  settings.game.ui.slots.three.width * settings.quality,
                  settings.game.ui.slots.three.height * settings.quality,
                  null,
                  true,
                  true
                );
              }
              if (
                weapon.selected === true &&
                systemimage.id === "selected_slot"
              ) {
                render.image(
                  systemimage,
                  settings.game.ui.slots.three.x * settings.quality,
                  settings.game.ui.slots.three.y * settings.quality,
                  settings.game.ui.slots.three.width * settings.quality,
                  settings.game.ui.slots.three.height * settings.quality,
                  null,
                  true,
                  true
                );
              }
            });
            render.image(
              image,
              settings.game.ui.slots.three.x * settings.quality,
              settings.game.ui.slots.three.y * settings.quality,
              settings.game.ui.slots.three.width * settings.quality,
              settings.game.ui.slots.three.height * settings.quality,
              null,
              true,
              true
            );
          }
          if (weapon.slotNumber === 4 && image.id === weapon.slot) {
            data.images.forEach(function (systemimage) {
              if (weapon.selected === false && systemimage.id === "slot") {
                render.image(
                  systemimage,
                  settings.game.ui.slots.four.x * settings.quality,
                  settings.game.ui.slots.four.y * settings.quality,
                  settings.game.ui.slots.four.width * settings.quality,
                  settings.game.ui.slots.four.height * settings.quality,
                  null,
                  true,
                  true
                );
              }
              if (
                weapon.selected === true &&
                systemimage.id === "selected_slot"
              ) {
                render.image(
                  systemimage,
                  settings.game.ui.slots.four.x * settings.quality,
                  settings.game.ui.slots.four.y * settings.quality,
                  settings.game.ui.slots.four.width * settings.quality,
                  settings.game.ui.slots.four.height * settings.quality,
                  null,
                  true,
                  true
                );
              }
            });
            render.image(
              image,
              settings.game.ui.slots.four.x * settings.quality,
              settings.game.ui.slots.four.y * settings.quality,
              settings.game.ui.slots.four.width * settings.quality,
              settings.game.ui.slots.four.height * settings.quality,
              null,
              true,
              true
            );
          }
          if (weapon.slotNumber === 5 && image.id === weapon.slot) {
            data.images.forEach(function (systemimage) {
              if (weapon.selected === false && systemimage.id === "slot") {
                render.image(
                  systemimage,
                  settings.game.ui.slots.five.x * settings.quality,
                  settings.game.ui.slots.five.y * settings.quality,
                  settings.game.ui.slots.five.width * settings.quality,
                  settings.game.ui.slots.five.height * settings.quality,
                  null,
                  true,
                  true
                );
              }
              if (
                weapon.selected === true &&
                systemimage.id === "selected_slot"
              ) {
                render.image(
                  systemimage,
                  settings.game.ui.slots.five.x * settings.quality,
                  settings.game.ui.slots.five.y * settings.quality,
                  settings.game.ui.slots.five.width * settings.quality,
                  settings.game.ui.slots.five.height * settings.quality,
                  null,
                  true,
                  true
                );
              }
            });
            render.image(
              image,
              settings.game.ui.slots.five.x * settings.quality,
              settings.game.ui.slots.five.y * settings.quality,
              settings.game.ui.slots.five.width * settings.quality,
              settings.game.ui.slots.five.height * settings.quality,
              null,
              true,
              true
            );
          }
          if (weapon.slotNumber === 6 && image.id === weapon.slot) {
            data.images.forEach(function (systemimage) {
              if (weapon.selected === false && systemimage.id === "slot") {
                render.image(
                  systemimage,
                  settings.game.ui.slots.six.x * settings.quality,
                  settings.game.ui.slots.six.y * settings.quality,
                  settings.game.ui.slots.six.width * settings.quality,
                  settings.game.ui.slots.six.height * settings.quality,
                  null,
                  true,
                  true
                );
              }
              if (
                weapon.selected === true &&
                systemimage.id === "selected_slot"
              ) {
                render.image(
                  systemimage,
                  settings.game.ui.slots.six.x * settings.quality,
                  settings.game.ui.slots.six.y * settings.quality,
                  settings.game.ui.slots.six.width * settings.quality,
                  settings.game.ui.slots.six.height * settings.quality,
                  null,
                  true,
                  true
                );
              }
            });
            render.image(
              image,
              settings.game.ui.slots.six.x * settings.quality,
              settings.game.ui.slots.six.y * settings.quality,
              settings.game.ui.slots.six.width * settings.quality,
              settings.game.ui.slots.six.height * settings.quality,
              null,
              true,
              true
            );
          }
        });
      });
    });
  },
};

export { slots };
