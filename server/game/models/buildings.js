const data = require("../data/data");
const SAT = require("sat");
const randomRange = require("../system/randomRange");
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

const build = {
  maxWidth: 200,
  maxHeight: 200,
  count: 15,
  minWidth: 20,
  minHeight: 20,
};

const building = {
  createBuilding: function () {
    for (var i = 0; i < build.count; i++) {
      this.addBuilding();
    }
  },
  calculatePositions: function () {
    for (var i = 0; i < data.buildings.length; i++) {
      var build = data.buildings[i];
      var x = build.nextPos.x / 80;
      var y = build.nextPos.y / 80;
      build.nextPos.x -= x;
      build.nextPos.y -= y;
      build.body.pos.x += x * 100;
      build.body.pos.y += y * 100;
      var s = hitObject(build.body.angle, build.nextAngle, 40);
      build.body.setAngle(s.newAngle);
    }
  },
  addBuilding: function (type = "block", _build = build) {
    var x = randomRange(0, data.map.length * data.rules.map.tiles.size);
    var y = randomRange(0, data.map.length * data.rules.map.tiles.size);
    var w = randomRange(_build.minWidth, _build.maxWidth);
    var h = randomRange(_build.minHeight, _build.maxHeight);
    var angle = randomRange(0, 2 * Math.PI);
    var weight = Math.floor(
      ((100 / _build.maxWidth) * w + (100 / _build.maxHeight) * h) / 2
    );
    var body = P(V(x, y), [V(0, 0), V(w, 0), V(w, h), V(0, h)])
      .translate(-w / 2, -h / 2)
      .setAngle(0);
    data.buildings.push({
      type: type,
      weight: weight,
      body: body,
      heavy: randomRange(0, 1),
      nextPos: { x: 0, y: 0 },
      nextAngle: angle,
    });
  },
  destoryBuilding: function (i) {},
};
module.exports = building;

// Function to hit an object and change its angle based on its speed and the angle size
function hitObject(currentAngle, targetAngle, speed) {
  while (targetAngle < -Math.PI) {
    targetAngle += 2 * Math.PI;
  }
  while (targetAngle > Math.PI) {
    targetAngle -= 2 * Math.PI;
  }

  while (currentAngle < -Math.PI) {
    currentAngle += 2 * Math.PI;
  }
  while (currentAngle > Math.PI) {
    currentAngle -= 2 * Math.PI;
  }

  let angleDifference = targetAngle - currentAngle;

  while (angleDifference < -Math.PI) {
    angleDifference += 2 * Math.PI;
  }
  while (angleDifference > Math.PI) {
    angleDifference -= 2 * Math.PI;
  }
  let direction = angleDifference > 0 ? 1 : -1;
  let acceleration = (direction * Math.abs(angleDifference)) / speed;
  let newAngle = currentAngle + acceleration;
  if (newAngle < 0) {
    newAngle += 2 * Math.PI;
  }
  if (newAngle >= 2 * Math.PI) {
    newAngle -= 2 * Math.PI;
  }
  return { newAngle, acceleration };
}
