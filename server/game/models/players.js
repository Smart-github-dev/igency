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
    // data.players.forEach(function (player) {
    //   if (player.slots.selected === 1) {
    //     player.slots.active = player.slots.one;
    //   }
    //   if (player.slots.selected === 2) {
    //     player.slots.active = player.slots.two;
    //   }
    //   if (player.slots.selected === 3) {
    //     player.slots.active = player.slots.three;
    //   }
    //   if (player.slots.selected === 4) {
    //     player.slots.active = player.slots.four;
    //   }
    //   if (player.slots.selected === 5) {
    //     player.slots.active = player.slots.five;
    //   }
    //   if (player.slots.selected === 6) {
    //     player.slots.active = player.slots.six;
    //   }
    // });
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
            shoted = bullets.shot(player.slots[weaponIndex]);
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
      var rules_hands = {};
      if (isGun) {
        rules_hands = data.hands[1];
        if (shoted) {
          hitRange.left = rules_hands.hitRange;
          hitRange.right = rules_hands.hitRange;
        }
      } else {
        rules_hands = data.hands[0];

        if (!blockHit) {
          if (player.hitside === "both") {
            hitRange.left = rules_hands.hitRange;
            hitRange.right = rules_hands.hitRange;
          }
          if (player.hitside === "left") {
            hitRange.left = rules_hands.hitRange;
          }
          if (player.hitside === "right") {
            hitRange.right = rules_hands.hitRange;
          }
        }
      }

      let leftHandDistance = Math.sqrt(
        Math.pow(rules_hands.left.offset.x, 2) +
          Math.pow(rules_hands.left.offset.y + hitRange.left, 2)
      );
      let rightHandDistance = Math.sqrt(
        Math.pow(rules_hands.right.offset.x, 2) +
          Math.pow(rules_hands.right.offset.y + hitRange.right, 2)
      );
      let leftHandAngle = Math.atan2(
        rules_hands.left.offset.y + hitRange.left,
        rules_hands.left.offset.x
      );
      let rightHandAngle = Math.atan2(
        rules_hands.right.offset.y + hitRange.right,
        rules_hands.right.offset.x
      );

      player.hands._right.pos.x =
        player._body.pos.x +
        Math.cos(player.angle + rightHandAngle) * rightHandDistance;
      player.hands._right.pos.y =
        player._body.pos.y +
        Math.sin(player.angle + rightHandAngle) * rightHandDistance;

      player.hands._left.pos.x =
        player._body.pos.x +
        Math.cos(player.angle + leftHandAngle) * leftHandDistance;

      player.hands._left.pos.y =
        player._body.pos.y +
        Math.sin(player.angle + leftHandAngle) * leftHandDistance;
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
        object._body.pos.x =
          object._body.pos.x + (Math.cos(radians) * distance) / diagonalLength;
        object._body.pos.y =
          object._body.pos.y + (Math.sin(radians) * distance) / diagonalLength;
        if (object._body.pos.x - data.rules.players.body.size / 2 <= 0) {
          object._body.pos.x = 0 + data.rules.players.body.size / 2;
        }
        if (object._body.pos.y - data.rules.players.body.size / 2 <= 0) {
          object._body.pos.y = 0 + data.rules.players.body.size / 2;
        }
        if (
          object._body.pos.x + data.rules.players.body.size / 2 >=
          data.map.length * data.rules.map.tiles.size
        ) {
          object._body.pos.x =
            data.map.length * data.rules.map.tiles.size -
            data.rules.players.body.size / 2;
        }
        if (
          object._body.pos.y + data.rules.players.body.size / 2 >=
          data.map[0].length * data.rules.map.tiles.size
        ) {
          object._body.pos.y =
            data.map[0].length * data.rules.map.tiles.size -
            data.rules.players.body.size / 2;
        }
      });
    });
  },
};

module.exports = players;
