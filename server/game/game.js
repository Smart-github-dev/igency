let data = require("./data/data.js");

let client = require("../root/client/client.js");

let players = require("./models/players.js");

let weapons = require("./models/weapons.js");

let bullets = require("./models/bullets.js");

let buildings = require("./models/buildings.js");

const simulate = require("./system/simulate.js");
let game = {
  run: function () {
    console.log("[game.js] Running game.run()...");
    setInterval(() => {
      players.toggleHit();
    }, data.rules.players.hands.hitSpeed);
    buildings.createBuilding();
    function loop() {
      players.move();
      players.calculateSlots();
      players.calculateHands();
      weapons.calculatePositions();
      bullets.calculatePositions();
      buildings.calculatePositions();

      simulate();
      var updata = {
        map: data.map,
        players: data.players.map((p) => {
          var player = {
            ammo: p.ammo,
            health: p.health,
            angle: p.angle,
            hit: p.hit,
            hitlock: p.hitlock,
            hitside: p.hitside,
            direction: p.direction,
            status: p.status,
            hands: {},
          };
          player.id = p.id;
          player.roles = p.roles;
          player.username = p.username;
          player.skin = p.skin;
          player.body = {};
          player.body.x = p._body.pos.x;
          player.body.y = p._body.pos.y;
          player.hands.right = {};
          player.hands.left = {};
          player.hands.right.x = p.hands._right.pos.x;
          player.hands.right.y = p.hands._right.pos.y;
          player.hands.left.x = p.hands._left.pos.x;
          player.hands.left.y = p.hands._left.pos.y;
          player.slots = p.slots.map((s) => {
            if (s.type == "melee") {
              return {
                type: s.type,
                id: s.id,
                slot: s.slot,
                loot: s.loot,
                offsetX: s.offsetX,
                offsetY: s.offsetY,
                width: s.width,
                height: s.height,
                angle: s.angle,
                distance: 0,
                slotNumber: s.slotNumber,
                selected: s.selected,
                // position: s.position,
                position: {
                  right: {
                    x: s.body.pos.x,
                    y: s.body.pos.y,
                    angle: s.body.angle,
                  },
                  left: {
                    x: null,
                    y: null,
                    angle: null,
                  },
                },
              };
            } else {
              return s;
            }
          });
          return player;
        }),
        bullets: data.bullets.map((b) => {
          var bullet = {};
          bullet.x = b.body.pos.x;
          bullet.y = b.body.pos.y;
          bullet.type = b.type;
          bullet.angle = b.angle;
          return bullet;
        }),
        buildings: data.buildings.map((_build) => {
          var build = {};
          build.type = _build.type;
          build.points = _build.body.calcPoints.map((p) => {
            return {
              x: _build.body.pos.x + p.x,
              y: _build.body.pos.y + p.y,
            };
          });
          return build;
        }),
        plants: [],
        rules: data.rules,
        hands: data.hands,
      };
      let message = {
        type: "update_data",
        data: updata,
      };
      message = JSON.stringify(message);
      client.pool.forEach(function (object) {
        object.send(message);
      });
    }
    setInterval(loop, 4);
  },
};

game.run();

module.exports = game;
