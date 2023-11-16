let data = require("../data/data.js");

let definitions = require("../definitions/definitions.js");

let weapons = {
  calculatePositions: function () {
    data.players.forEach(function (player) {
      player.slots.forEach(function (weapon) {
        let modification = {
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
        let position = {
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
        if (weapon.type === "melee") {
          definitions.weapons.melees.forEach(function (melee) {
            if (melee.id === weapon.id) {
              if (weapon.active === false) {
                let weaponDistance = Math.sqrt(
                  Math.pow(melee.hitbox.offsetX, 2) +
                    Math.pow(melee.hitbox.offsetY, 2)
                );
                let weaponAngle = Math.atan2(
                  melee.hitbox.offsetY,
                  melee.hitbox.offsetX
                );
                position.right.x =
                  player.hands.right.x +
                  Math.cos(player.angle + weaponAngle) * weaponDistance;
                position.right.y =
                  player.hands.right.y +
                  Math.sin(player.angle + weaponAngle) * weaponDistance;
                position.right.angle = player.angle + melee.hitbox.angle;
              }
              if (weapon.active === true) {
                if (melee.hit === "stab") {
                  let weaponDistance = Math.sqrt(
                    Math.pow(melee.hitbox.offsetX, 2) +
                      Math.pow(melee.hitbox.offsetY, 2)
                  );
                  let weaponAngle = Math.atan2(
                    melee.hitbox.offsetY,
                    melee.hitbox.offsetX
                  );
                  position.right.x =
                    player.hands.right.x +
                    Math.cos(player.angle + weaponAngle) * weaponDistance;
                  position.right.y =
                    player.hands.right.y +
                    Math.sin(player.angle + weaponAngle) * weaponDistance;
                  position.right.angle = player.angle + melee.hitbox.angle;
                }
                if (melee.hit === "rotate") {
                  modification = weapon.modification;
                  modification.position.right.angle =
                    modification.position.right.angle + 0.1;
                  let weaponDistance = Math.sqrt(
                    Math.pow(melee.hitbox.offsetX, 2) +
                      Math.pow(melee.hitbox.offsetY, 2)
                  );
                  let weaponAngle = Math.atan2(
                    melee.hitbox.offsetY,
                    melee.hitbox.offsetX
                  );
                  position.right.x =
                    player.hands.right.x +
                    Math.cos(player.angle + weaponAngle) * weaponDistance;
                  position.right.y =
                    player.hands.right.y +
                    Math.sin(player.angle + weaponAngle) * weaponDistance;
                  position.right.angle =
                    player.angle +
                    melee.hitbox.angle +
                    modification.position.right.angle;
                }
                if (melee.hit === "whirl") {
                  modification = weapon.modification;
                  modification.position.right.angle =
                    modification.position.right.angle + 0.05;
                  let newAngle =
                    player.angle +
                    melee.hitbox.angle +
                    modification.position.right.angle;
                  let newPosition = rotateWeapon(
                    player.hands.right.x + melee.hitbox.offsetX / 2,
                    player.hands.right.y + melee.hitbox.offsetY / 2,
                    melee.hitbox.width - melee.hitbox.offsetX / 2,
                    melee.hitbox.height - melee.hitbox.offsetY / 2,
                    newAngle,
                    player.hands.right.x,
                    player.hands.right.y
                  );
                  position.right.x = newPosition.x;
                  position.right.y = newPosition.y;
                  position.right.angle = newPosition.angle;
                  function rotateWeapon(
                    rectX,
                    rectY,
                    rectWidth,
                    rectHeight,
                    rotationAngle,
                    rotationPointX,
                    rotationPointY
                  ) {
                    let centerX = rectX - rectWidth / 2;
                    let centerY = rectY - rectHeight / 2;
                    let distanceX = centerX - rotationPointX;
                    let distanceY = centerY - rotationPointY;
                    let rotatedCenterX =
                      rotationPointX +
                      distanceX * Math.cos(rotationAngle) -
                      distanceY * Math.sin(rotationAngle);
                    let rotatedCenterY =
                      rotationPointY +
                      distanceX * Math.sin(rotationAngle) +
                      distanceY * Math.cos(rotationAngle);
                    let rotatedRectX = rotatedCenterX;
                    let rotatedRectY = rotatedCenterY;
                    let angle = rotationAngle % (2 * Math.PI);
                    return {
                      x: rotatedRectX,
                      y: rotatedRectY,
                      angle: angle,
                    };
                  }
                }
              }
              if (player.hit === true) {
                weapon.active = true;
              } else {
                weapon.active = false;
              }
              weapon.position = position;
              weapon.modification = modification;
            }
          });
        }

        if (weapon.type === "guns") {
          let weaponDistance = Math.sqrt(
            Math.pow(weapon.offsetX, 2) + Math.pow(weapon.offsetY, 2)
          );
          let weaponAngle = Math.atan2(weapon.offsetY, weapon.offsetX);
          position.right.x =
            player.hands.right.x +
            Math.cos(player.angle + weaponAngle) * weaponDistance;
          position.right.y =
            player.hands.right.y +
            Math.sin(player.angle + weaponAngle) * weaponDistance;
          position.right.angle = player.angle + weapon.angle;
          weapon.position = position;
          weapon.modification = modification;
        }
      });
    });
  },
};

module.exports = weapons;
