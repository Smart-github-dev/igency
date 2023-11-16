let settings = require("../settings/settings.js");

let data = require("../../game/data/data.js");

let definitions = require("../../game/definitions/definitions.js");

let WebSocket = require("ws");

let client = {
  pool: [],
  portal: new WebSocket.Server({ port: 2023 }),
  events: function () {
    console.log("[client.js] Running client.events()...");
    this.portal.on("connection", (ws, req) => {
      let id = settings.id(32);
      console.log(`+ user (id: "${id}")`);
      client.pool.push(ws);
      let message = {
        type: "approve_ID",
        data: id,
      };
      message = JSON.stringify(message);
      ws.send(message);
      let allowGameStart = {
        type: "approve_game_start",
      };
      allowGameStart = JSON.stringify(allowGameStart);
      ws.send(allowGameStart);
      ws.on("close", () => {
        console.log(`- user (id: "${id})"`);
        let newPool = [];
        client.pool.forEach(function (object) {
          if (object !== ws) {
            newPool.push(object);
          }
        });
        client.pool = newPool;
        let newPlayers = [];
        data.players.forEach(function (object) {
          if (object.id !== id) {
            newPlayers.push(object);
          }
        });
        data.players = newPlayers;
      });
      ws.on("message", (message) => {
        message = JSON.parse(message);
        let messageType = message.type;
        let messageData = message.data;
        if (messageType === "request_new_player") {
          let player = JSON.parse(JSON.stringify(definitions.player));
          player.id = messageData.id;
          player.roles = messageData.roles;
          player.username = messageData.game.player.username;
          player.skin.body = messageData.game.player.skin.body;
          player.skin.hands.left = messageData.game.player.skin.hands.left;
          player.skin.hands.right = messageData.game.player.skin.hands.right;
          player.body.x = Math.floor(
            Math.random() * data.map.length * data.rules.map.tiles.size -
              data.rules.players.body.size +
              data.rules.players.body.size
          );
          player.body.y = Math.floor(
            Math.random() * data.map[0].length * data.rules.map.tiles.size -
              data.rules.players.body.size +
              data.rules.players.body.size
          );
          let leftHandDistance = Math.sqrt(
            Math.pow(data.rules.players.hands.left.offset.x, 2) +
              Math.pow(data.rules.players.hands.left.offset.y, 2)
          );
          let rightHandDistance = Math.sqrt(
            Math.pow(data.rules.players.hands.right.offset.x, 2) +
              Math.pow(data.rules.players.hands.right.offset.y, 2)
          );
          let leftHandAngle = Math.atan2(
            data.rules.players.hands.left.offset.y,
            data.rules.players.hands.left.offset.x
          );
          let rightHandAngle = Math.atan2(
            data.rules.players.hands.right.offset.y,
            data.rules.players.hands.right.offset.x
          );
          player.hands.left.x =
            player.body.x +
            Math.cos(player.angle + leftHandAngle) * leftHandDistance;
          player.hands.left.y =
            player.body.y +
            Math.sin(player.angle + leftHandAngle) * leftHandDistance;
          player.hands.right.x =
            player.body.x +
            Math.cos(player.angle + rightHandAngle) * rightHandDistance;
          player.hands.right.y =
            player.body.y +
            Math.sin(player.angle + rightHandAngle) * rightHandDistance;
          data.rules.weapons.melees.forEach(function (object) {
            let weapon = object;
            if (object.id === "dagger") {
              weapon.slotNumber = 1;
              weapon.selected = false;
              player.slots.push(weapon);
            }
            if (object.id === "knife") {
              weapon.slotNumber = 2;
              weapon.selected = false;
              player.slots.push(weapon);
            }
            if (object.id === "hands") {
              weapon.slotNumber = 3;
              weapon.selected = false;
              player.slots.push(weapon);
            }
            if (object.id === "long_sword") {
              weapon.slotNumber = 4;
              weapon.selected = true;
              player.slots.push(weapon);
            }
          });
          data.rules.weapons.guns.forEach(function (object) {
            let guns = object;
            if (object.id === "pistol") {
              guns.slotNumber = 5;
              guns.selected = false;
              player.slots.push(guns);
            }
            if (object.id === "m16") {
              guns.slotNumber = 6;
              guns.selected = false;
              player.slots.push(guns);
            }
          });
          data.players.push(player);
        }
        if (messageType === "update_move") {
          data.players.forEach(function (object) {
            if (object.id === messageData.id) {
              object.direction = messageData.direction;
            }
          });
        }
        if (messageType === "update_selection") {
          data.players.forEach(function (player) {
            if (player.id === messageData.id) {
              if (messageData.selection.includes(1)) {
                player.slots.forEach(function (weapon) {
                  if (weapon.slotNumber === 1) {
                    weapon.selected = true;
                  } else {
                    weapon.selected = false;
                  }
                });
              }
              if (messageData.selection.includes(2)) {
                player.slots.forEach(function (weapon) {
                  if (weapon.slotNumber === 2) {
                    weapon.selected = true;
                  } else {
                    weapon.selected = false;
                  }
                });
              }
              if (messageData.selection.includes(3)) {
                player.slots.forEach(function (weapon) {
                  if (weapon.slotNumber === 3) {
                    weapon.selected = true;
                  } else {
                    weapon.selected = false;
                  }
                });
              }
              if (messageData.selection.includes(4)) {
                player.slots.forEach(function (weapon) {
                  if (weapon.slotNumber === 4) {
                    weapon.selected = true;
                  } else {
                    weapon.selected = false;
                  }
                });
              }
              if (messageData.selection.includes(5)) {
                player.slots.forEach(function (weapon) {
                  if (weapon.slotNumber === 5) {
                    weapon.selected = true;
                  } else {
                    weapon.selected = false;
                  }
                });
              }
              if (messageData.selection.includes(6)) {
                player.slots.forEach(function (weapon) {
                  if (weapon.slotNumber === 6) {
                    weapon.selected = true;
                  } else {
                    weapon.selected = false;
                  }
                });
              }
            }
          });
        }
        if (messageType === "stop_move") {
          data.players.forEach(function (object) {
            if (object.id === messageData.id) {
              object.direction = messageData.direction;
              object.hit = messageData.hit;
            }
          });
        }
        if (messageType === "update_mouse") {
          data.players.forEach(function (object) {
            if (object.id === messageData.id) {
              let mouse = messageData.mouse;
              let dx = mouse.x;
              let dy = mouse.y;
              let angle = Math.atan2(dy, dx) - Math.PI / 2;
              object.angle = angle;
              object.hit = mouse.down;
            }
          });
        }
        if (messageType === "update_angle") {
          data.players.forEach(function (object) {
            if (object.id === messageData.id) {
              object.angle = messageData.angle;
              object.hit = messageData.hit;
            }
          });
        }
      });
    });
  },
};

client.events();

module.exports = client;
