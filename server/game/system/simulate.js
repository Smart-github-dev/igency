let data = require("../data/data.js");
const SAT = require("sat");
var response = new SAT.Response(); // Response reused for collisions

function swingSword(player, other) {
  if (player.hit === true) {
    const weaponIndex = player.slots.findIndex(function (weapon) {
      return weapon.selected && weapon.type === "melee";
    });
    if (weaponIndex != -1) {
      const weapon1 = player.slots[weaponIndex];

      const otherweaponIndex = other.slots.findIndex(function (weapon) {
        return weapon.selected && weapon.type === "melee";
      });

      if (otherweaponIndex != -1) {
        const weapon2 = other.slots[otherweaponIndex];
        const collided = SAT.testPolygonPolygon(
          weapon1.body,
          weapon2.body,
          response
        );
        if (collided) {
          if (other.hit) {
            response.overlapV.scale(0.8);
          } else {
            response.overlapV.scale(0.6);
          }
          other._body.pos.add(response.overlapV);
          response.clear();
          return;
        }
      }

      const collided = SAT.testPolygonCircle(
        weapon1.body,
        other._body,
        response
      );
      if (collided) {
        response.overlapV.scale(0.1);
        other._body.pos.add(response.overlapV);
        response.clear();
      }
    }
  }
}

function bulletShot(player) {
  data.bullets.forEach((bullet, i) => {
    const collided = SAT.testCircleCircle(bullet.body, player._body, response);
    if (collided) {
      response.overlapV.scale(0.3);
      player._body.pos.add(response.overlapV);
      response.clear();
      data.bullets.splice(i, 1);
    }
  });
}

function buildingToBulletCollision() {
  for (var k = 0; k < data.buildings.length; k++) {
    const build = data.buildings[k];
    data.bullets.forEach((bullet, i) => {
      response.clear();
      const collided = SAT.testCirclePolygon(bullet.body, build.body, response);
      if (collided) {
        if (!build.heavy) {
          response.overlapV.scale(build.weight / 1000);
          var angleInRadians = Math.atan2(
            response.overlapV.y,
            response.overlapV.x
          );
          response.overlapV.scale(1 - build.weight / 100);
          build.nextPos.x += response.overlapV.x;
          build.nextPos.y += response.overlapV.y;
          build.nextAngle = angleInRadians / 2;
        }
        data.bullets.splice(i, 1);
      }
    });
    if (!build.heavy) {
      data.buildings.forEach((build2, j) => {
        if (j != k) {
          response.clear();
          const collided = SAT.testPolygonPolygon(
            build2.body,
            build.body,
            response
          );
          if (collided) {
            if (response.aInB || response.bInA) {
            } else {
              response.overlapV.scale(0.5);
              build.body.pos.add(response.overlapV);
              build2.body.pos.sub(response.overlapV);
            }
          }
        }
      });
    }
  }
}

module.exports = function () {
  for (var i = 0; i < data.players.length; i++) {
    const player = data.players[i];

    for (var j = 0; j < data.players.length; j++) {
      const other = data.players[j];
      if (player.id != other.id) {
        response.clear();
        var collided = SAT.testCircleCircle(
          player._body,
          other._body,
          response
        );
        if (collided) {
          response.overlapV.scale(0.5);
          player._body.pos.sub(response.overlapV);
          other._body.pos.add(response.overlapV);
        }
        swingSword(player, other);
      }
    }

    for (var k = 0; k < data.buildings.length; k++) {
      const build = data.buildings[k];
      response.clear();
      var collided = SAT.testCirclePolygon(player._body, build.body, response);
      if (collided) {
        response.overlapV.scale(build.weight / 100);
        player._body.pos.sub(response.overlapV);
        if (!build.heavy) {
          var angleInRadians = Math.atan2(
            response.overlapV.y,
            response.overlapV.x
          );
          build.body.pos.add(response.overlapV);
          build.nextAngle = angleInRadians / 2;
        }
      }
    }

    bulletShot(player);
  }
  buildingToBulletCollision();
};
