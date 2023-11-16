import { data } from "../data/data.js";

import { settings } from "../../root/settings/settings.js";

import { definitions } from "../definitions/definitions.js";

import { render } from "../system/render.js";

let bullets = {
  render: function () {
    data.bullets.forEach(function (bullet) {
      var x = bullet.x;
      var y = bullet.y;
      var width = 5;
      var height = 12;
      var fillcolor = "red";
      var strokecolor = "yellow";
      var linewidth = 1;

      if (render.onScreen(x, y, width, height) === false) {
        return;
      }
      x = render.unity(x);
      y = render.unity(y);
      width = render.unity(width);
      height = render.unity(height);
      linewidth = render.unity(linewidth);
      render.ctx.save();
      render.ctx.translate(x, y);
      render.ctx.rotate(bullet.angle);
      render.ctx.rect(-width / 2, 0, width, height);
      if (fillcolor) {
        render.ctx.fillStyle = fillcolor;
        render.ctx.fill();
      }
      if (strokecolor) {
        render.ctx.lineWidth = linewidth;
        render.ctx.strokeStyle = strokecolor;
        render.ctx.stroke();
      }
      render.ctx.restore();
    });
  },
};

export { bullets };
