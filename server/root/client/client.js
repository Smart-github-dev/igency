let settings = require("../settings/settings.js");

let data = require("../../game/data/data.js");

let definitions = require("../../game/definitions/definitions.js");
const SAT = require("sat");
var V = function (x, y) {
  return new SAT.Vector(x, y);
};
var P = function (pos, points) {
  return new SAT.Polygon(pos, points);
};
var C = function (pos, r) {
  return new SAT.Circle(pos, r);
};
var B = function (pos, w, h) {
  return new SAT.Box(pos, w, h);
};
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
          var bodyx = Math.floor(
            Math.random() * data.map.length * data.rules.map.tiles.size -
              data.rules.players.body.size +
              data.rules.players.body.size
          );
          var bodyy = Math.floor(
            Math.random() * data.map[0].length * data.rules.map.tiles.size -
              data.rules.players.body.size +
              data.rules.players.body.size
          );

          player._body = C(V(bodyx, bodyy), data.rules.players.body.size / 2);

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

          handsleftx =
            bodyx + Math.cos(player.angle + leftHandAngle) * leftHandDistance;
          handslefty =
            bodyy + Math.sin(player.angle + leftHandAngle) * leftHandDistance;
          player.hands._left = C(
            V(handsleftx, handslefty),
            data.rules.players.hands.left.size / 2
          );

          handsrightx =
            player.body.x +
            Math.cos(player.angle + rightHandAngle) * rightHandDistance;
          handsrighty =
            player.body.y +
            Math.sin(player.angle + rightHandAngle) * rightHandDistance;

          player.hands._right = C(
            V(handsrightx, handsrighty),
            data.rules.players.hands.right.size / 2
          );

          data.rules.weapons.melees.forEach(function (object) {
            let weapon = object;
            weapon.modification = {
              position: {
                right: {
                  x: 0,
                  y: 0,
                  angle: 0,
                },
                left: {
                  x: 0,
                  y: 0,
                  angle: 0,
                },
              },
            };
            weapon.position = {
              right: {
                x: null,
                y: null,
                angle: null,
              },
              left: {
                x: null,
                y: null,
                angle: null,
              },
            };
            if (object.id === "dagger") {
              weapon.slotNumber = 1;
              weapon.selected = false;
            }
            if (object.id === "knife") {
              weapon.slotNumber = 2;
              weapon.selected = false;
            }
            if (object.id === "hands") {
              weapon.slotNumber = 3;
              weapon.selected = false;
            }
            if (object.id === "long_sword") {
              weapon.slotNumber = 4;
              weapon.selected = true;
            }
            weapon.body = B(
              V(0, 0),
              weapon.width / 2,
              weapon.height / 2
            ).toPolygon();
            player.slots.push({ ...weapon });
          });
          data.rules.weapons.guns.forEach(function (object) {
            let guns = object;
            guns.modification = {
              position: {
                right: {
                  x: 0,
                  y: 0,
                  angle: 0,
                },
                left: {
                  x: 0,
                  y: 0,
                  angle: 0,
                },
              },
            };
            guns.position = {
              right: {
                x: null,
                y: null,
                angle: null,
              },
              left: {
                x: null,
                y: null,
                angle: null,
              },
            };
            if (object.id === "pistol") {
              guns.slotNumber = 5;
              guns.selected = false;
              player.slots.push({ ...guns });
            }
            if (object.id === "m16") {
              guns.slotNumber = 6;
              guns.selected = false;
              player.slots.push({ ...guns });
            }
          });
          data.players.push({ ...player });
        } else {
          var pleyerIndex = data.players.findIndex((player) => {
            return player.id === messageData.id;
          });
          if (pleyerIndex != -1) {
            var player = data.players[pleyerIndex];
            if (messageType === "update_move") {
              player.direction = messageData.direction;
            }
            if (messageType === "update_selection") {
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
            if (messageType === "stop_move") {
              player.direction = messageData.direction;
              player.hit = messageData.hit;
            }
            if (messageType === "update_mouse") {
              let mouse = messageData.mouse;
              let dx = mouse.x;
              let dy = mouse.y;
              let angle = Math.atan2(dy, dx) - Math.PI / 2;
              player.angle = angle;
              player.hit = mouse.down;
            }
            if (messageType === "update_angle") {
              player.angle = messageData.angle;
              player.hit = messageData.hit;
            }
          }
        }
      });
    });
  },
};

client.events();

module.exports = client;
