import { definitions } from "./definitions/definitions.js";

import { data } from "./data/data.js";

import { settings } from "../root/settings/settings.js";

import { server } from "../root/server/server.js";

import { players } from "./models/players.js";

import { map } from "./models/map.js";

import { render } from "./system/render.js";

import { camera } from "./models/camera.js";

import { input } from "./system/input.js";

import { joysticks } from "./ui/joysticks.js";

import { healthbar } from "./ui/healthbar.js";

import { slots } from "./ui/slots.js";

import { weapons } from "./models/weapons.js";
import { bullets } from "./models/bullets.js";
import { buildings } from "./models/buildings.js";

let game = {
  preload: function () {
    let game = document.querySelector("#game");
    console.log("%c[game.js] Running game.preload()...", "color: #0074ff");
    let images = [
      ...definitions.ui.joysticks,
      ...definitions.ui.healthbar,
      ...definitions.ui.slots.system,
      ...definitions.ui.slots.weapons.melees,
      ...definitions.ui.slots.weapons.guns,
      ...definitions.skins,
      ...definitions.weapons.melees,
      ...definitions.weapons.guns,
      ...definitions.map.tiles,
    ];
    let imagesData = [];
    images.forEach(function (object) {
      let image = new Image();
      image.type = object.type;
      image.id = object.id;
      image.src = object.src;
      imagesData.push(image);
    });
    let newData = data;
    newData.images = imagesData;
    data.$(newData);
  },
  prepare: function () {
    console.log("%c[game.js] Running game.prepare()...", "color: #0074ff");
    let game = document.querySelector("#game");
    let newSettings = settings;
    newSettings.window.width = window.innerWidth;
    newSettings.window.height = window.innerHeight;
    settings.$(newSettings);
    window.innerWidth = window.innerWidth * settings.quality;
    window.innerHeight = window.innerHeight * settings.quality;
    game.width = window.innerWidth;
    game.height = window.innerHeight;
  },
  run: function () {
    console.log("%c[game.js] Running game.run()...", "color: #0074ff");
    if (settings.id === null) {
      console.log(
        "%c[game.js] ID (in scripts/root/settings/settings.js -> settings.id) is null...",
        "color: #fc0000"
      );
      return;
    } else {
      input.events();
      document.querySelector("#homemenu").style.display = "none";
      document.querySelector("#game").style.display = "block";
      let message = {
        type: "request_new_player",
        data: settings,
      };
      server.send(message);
      function loop() {
        let player = null;
        data.players.forEach(function (object) {
          if (object.id === settings.id) {
            player = object;
          }
        });
        if (player !== null) {
          joysticks.calculate();
          slots.calculate();
          render.clear();
          camera.start();
          map.render();
          players.renderBody();
          weapons.render();
          bullets.render();
          players.renderHands();
          buildings.render();
          camera.stop();
          healthbar.render();
          slots.render();
          joysticks.render();
        }
        requestAnimationFrame(loop);
      }
      loop();
    }
  },
};

game.preload();

export { game };
