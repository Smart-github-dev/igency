import { data } from "../data/data.js";

import { settings } from "../../root/settings/settings.js";

import { definitions } from "../definitions/definitions.js";

import { render } from "../system/render.js";

let buildings = {
  render: function () {
    data.buildings.forEach((build) => {
      render.ctx.save();
      var points = build.points;
      render.ctx.beginPath();
      render.ctx.moveTo(render.unity(points[0].x), render.unity(points[0].y)); // Move to the first vertex

      for (let i = 1; i < points.length; i++) {
        render.ctx.lineTo(render.unity(points[i].x), render.unity(points[i].y));
      }

      render.ctx.closePath();

      render.ctx.strokeStyle = "black"; // Border color
      render.ctx.lineWidth = 2; // Border width
      render.ctx.fillStyle = "lightblue"; // Fill color

      render.ctx.fill(); // Fill the polygon with the fill color
      render.ctx.stroke(); // Draw the border of the polygon
      render.ctx.restore();
    });
  },
  drawPolygon: function (points) {},
};

export { buildings };
