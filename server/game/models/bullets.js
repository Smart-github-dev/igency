let data = require("../data/data.js");

let definitions = require("../definitions/definitions.js");

let bullets = {
  calculatePositions: function () {
    data.bullets.forEach((bullet, i) => {
      let radians = bullet.angle;
      let distance = bullet.speed;
      bullet.x = bullet.x - Math.sin(radians) * distance;
      bullet.y = bullet.y + Math.cos(radians) * distance;
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

        x: gun.position.right.x - (Math.sin(angle) * gun.height) / 2,
        y: gun.position.right.y + (Math.cos(angle) * gun.height) / 2,
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
