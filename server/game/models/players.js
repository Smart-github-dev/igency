let data = require("../data/data.js");

let probability = require("../system/probability.js");

let definitions = require("../definitions/definitions.js");
let bullets = require("./bullets.js");

let players = {
  toggleHit: function () {
    data.players.forEach(function (object) {
      object.hitlock = !object.hitlock;
      if (probability(30) === true) {
        object.hitside = "left";
      } else if (probability(30) === true) {
        object.hitside = "right";
      } else {
        object.hitside = "both";
      }
    });
  },
  calculateSlots: function () {
    data.players.forEach(function (player) {
      if (player.slots.selected === 1) {
        player.slots.active = player.slots.one;
      }
      if (player.slots.selected === 2) {
        player.slots.active = player.slots.two;
      }
      if (player.slots.selected === 3) {
        player.slots.active = player.slots.three;
      }
      if (player.slots.selected === 4) {
        player.slots.active = player.slots.four;
      }
    });
  },
  calculateHands: function () {
    data.players.forEach(function (player) {
      let hitRange = {
        left: 0,
        right: 0,
      };
      let isGun = false;
      let blockHit = true;
      let shoted = false;
      const weaponIndex = player.slots.findIndex(function (weapon) {
        return weapon.selected;
      });

      if (weaponIndex != -1) {
        if (player.slots[weaponIndex].type === "guns") {
          isGun = true;
          if (player.hit === true) {
            shoted = bullets.shot(player.slots[weaponIndex], player.angle);
          }
        } else {
          if (player.hit === true) {
            blockHit =
              definitions.weapons.melees.findIndex(function (melee) {
                if (
                  player.slots[weaponIndex].id === melee.id &&
                  player.slots[weaponIndex].selected === true &&
                  melee.hit == "stab"
                ) {
                  return true;
                } else {
                  return false;
                }
              }) == -1
                ? true
                : false;
          }
        }
      }

      if (isGun) {
        data.rules.players.hands = data.hands[1];
        if (shoted) {
          hitRange.left = data.rules.players.hands.hitRange;
          hitRange.right = data.rules.players.hands.hitRange;
        }
      } else {
        data.rules.players.hands = data.hands[0];

        if (!blockHit) {
          if (player.hitside === "both") {
            hitRange.left = data.rules.players.hands.hitRange;
            hitRange.right = data.rules.players.hands.hitRange;
          }
          if (player.hitside === "left") {
            hitRange.left = data.rules.players.hands.hitRange;
          }
          if (player.hitside === "right") {
            hitRange.right = data.rules.players.hands.hitRange;
          }
        }
      }

      let leftHandDistance = Math.sqrt(
        Math.pow(data.rules.players.hands.left.offset.x, 2) +
          Math.pow(data.rules.players.hands.left.offset.y + hitRange.left, 2)
      );
      let rightHandDistance = Math.sqrt(
        Math.pow(data.rules.players.hands.right.offset.x, 2) +
          Math.pow(data.rules.players.hands.right.offset.y + hitRange.right, 2)
      );
      let leftHandAngle = Math.atan2(
        data.rules.players.hands.left.offset.y + hitRange.left,
        data.rules.players.hands.left.offset.x
      );
      let rightHandAngle = Math.atan2(
        data.rules.players.hands.right.offset.y + hitRange.right,
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
    });
  },
  move: function () {
    data.players.forEach(function (object) {
      object.direction.forEach(function (angle) {
        let diagonalLength = 1;
        if (object.direction.length >= 2) {
          diagonalLength = 1.3;
        }
        let radians = angle * (Math.PI / 180);
        let distance = data.rules.players.speed;
        object.body.x =
          object.body.x + (Math.cos(radians) * distance) / diagonalLength;
        object.body.y =
          object.body.y + (Math.sin(radians) * distance) / diagonalLength;
        if (object.body.x - data.rules.players.body.size / 2 <= 0) {
          object.body.x = 0 + data.rules.players.body.size / 2;
        }
        if (object.body.y - data.rules.players.body.size / 2 <= 0) {
          object.body.y = 0 + data.rules.players.body.size / 2;
        }
        if (
          object.body.x + data.rules.players.body.size / 2 >=
          data.map.length * data.rules.map.tiles.size
        ) {
          object.body.x =
            data.map.length * data.rules.map.tiles.size -
            data.rules.players.body.size / 2;
        }
        if (
          object.body.y + data.rules.players.body.size / 2 >=
          data.map[0].length * data.rules.map.tiles.size
        ) {
          object.body.y =
            data.map[0].length * data.rules.map.tiles.size -
            data.rules.players.body.size / 2;
        }
      });
    });
  },
};

module.exports = players;
