let data = require("../data/data.js");

let definitions = require("../definitions/definitions.js");
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
let bullets = {
  calculatePositions: function () {
    data.bullets.forEach((bullet, i) => {
      let radians = bullet.angle;
      let distance = bullet.speed;
      bullet.body.pos.x = bullet.body.pos.x - Math.sin(radians) * distance;
      bullet.body.pos.y = bullet.body.pos.y + Math.cos(radians) * distance;
      if (bullet.effective_range < 0) {
        this.destory(i);
      } else {
        bullet.effective_range -= distance;
      }
    });
  },
  destory: function (i) {
    data.bullets.splice(i, 1);
  },
  shot: function (gun) {
    if (gun.bullets.count == 0) {
      return false;
    }
    var dt = Date.now();
    if (dt - gun.bullets.lastdt > gun.bullets.reloadt) {
      let angle = gun.position.right.angle;
      data.bullets.push({
        type: gun.id,
        body: C(
          V(
            gun.position.right.x - (Math.sin(angle) * gun.height) / 2,
            gun.position.right.y + (Math.cos(angle) * gun.height) / 2
          ),
          4
        ),
        angle: angle,
        speed: gun.bullets.speed,
        damage: gun.bullets.damage,
        effective_range: gun.bullets.effective_range,
      });
      gun.bullets.lastdt = dt;
      gun.bullets.count--;
      return true;
    }
    return false;
  },
};

module.exports = bullets;
