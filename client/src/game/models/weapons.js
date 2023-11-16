import { data } from "../data/data.js";

import { settings } from "../../root/settings/settings.js";

import { definitions } from "../definitions/definitions.js";

import { render } from "../system/render.js";

let weapons = {
  render: function () {
    data.players.forEach(function (player) {
      player.slots.forEach(function (slot) {
        if (slot.selected === true) {
          data.images.forEach(function (image) {
            if (image.id === slot.id) {
              render.image(
                image,
                slot.position.right.x,
                slot.position.right.y,
                slot.width,
                slot.height,
                slot.position.right.angle
              );
            }
          });
        }
      });
    });
  },
};

setTimeout(() => {
  console.log(data);
}, 5000);

export { weapons };
