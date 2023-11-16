import { settings } from "../settings/settings.js";

import { game } from "../../game/game.js";

import { data } from "../../game/data/data.js";

let server = {
  portal: new WebSocket(settings.root.server.address),
  events: function () {
    console.log("%c[server.js] Running server.events()...", "color: #0074ff");
    this.portal.addEventListener("open", () => {
      console.log("%c[server.js] Connection opened...", "color: #00cc22");
    });
    this.portal.addEventListener("close", () => {
      console.log("%c[server.js] Connection closed...", "color: #fc0000");
    });
    this.portal.addEventListener("message", (event) => {
      let message = JSON.parse(event.data);
      let messageType = message.type;
      let messageData = message.data;
      if (messageType === "approve_ID") {
        let newSettings = settings;
        newSettings.id = messageData;
        settings.$(newSettings);
      }
      if (messageType === "approve_game_start") {
        game.prepare();
      }
      if (messageType === "update_data") {
        let newData = data;
        newData.map = messageData.map;
        newData.players = messageData.players;
        newData.bullets = messageData.bullets;
        newData.buildings = messageData.buildings;
        newData.plants = messageData.plants;
        newData.rules = messageData.rules;
        data.$(newData);
      }
    });
  },
  send: function (data) {
    data = JSON.stringify(data);
    this.portal.send(data);
  },
};

server.events();

export { server };
