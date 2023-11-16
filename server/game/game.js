let data = require("./data/data.js");

let client = require("../root/client/client.js");

let players = require("./models/players.js");

let weapons = require("./models/weapons.js");

let bullets = require("./models/bullets.js");

let game = {
  run: function () {
    console.log("[game.js] Running game.run()...");
    setInterval(() => {
      players.toggleHit();
    }, data.rules.players.hands.hitSpeed);
    function loop() {
      players.move();
      players.calculateSlots();
      players.calculateHands();
      weapons.calculatePositions();
      bullets.calculatePositions();
      let message = {
        type: "update_data",
        data: data,
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
