import { camera } from "../models/camera.js";

import { settings } from "../../root/settings/settings.js";

let render = {
  ctx: document.querySelector("#game").getContext("2d"),
  unity: function (number, command) {
    let newnumber =
      (Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) / 1920) *
      number;
    if (command === 1) {
      return Math.floor(newnumber);
    } else {
      return newnumber;
    }
  },
  rectangle: function (x, y, width, height, fillcolor, strokecolor, linewidth) {
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.imageSmoothingQuality = "high";
    if (this.onScreen(x, y, width, height) === false) {
      return;
    }
    x = this.unity(x);
    y = this.unity(y);
    width = this.unity(width);
    height = this.unity(height);
    linewidth = this.unity(linewidth);
    this.ctx.beginPath();
    this.ctx.rect(x, y, width, height);
    if (fillcolor) {
      this.ctx.fillStyle = fillcolor;
      this.ctx.fill();
    }
    if (strokecolor) {
      this.ctx.lineWidth = linewidth;
      this.ctx.strokeStyle = strokecolor;
      this.ctx.stroke();
    }
    this.ctx.closePath();
  },
  circle: function (
    x,
    y,
    radius,
    fillcolor,
    strokecolor,
    linewidth,
    noUnity = false
  ) {
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.imageSmoothingQuality = "high";
    if (this.onScreen(x, y, radius * 2, radius * 2) === false) {
      return;
    }
    if (noUnity === false) {
      x = this.unity(x);
      y = this.unity(y);
    }
    radius = this.unity(radius);
    linewidth = this.unity(linewidth);
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    if (fillcolor) {
      this.ctx.fillStyle = fillcolor;
      this.ctx.fill();
    }
    if (strokecolor) {
      this.ctx.lineWidth = linewidth;
      this.ctx.strokeStyle = strokecolor;
      this.ctx.stroke();
    }
    this.ctx.closePath();
  },
  image: function (
    img,
    x,
    y,
    width,
    height,
    angleInRadians = null,
    noUnity = false,
    noOnscreen = false
  ) {
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.imageSmoothingQuality = "high";
    if (this.onScreen(x, y, width, height) === false && noOnscreen === false) {
      return;
    }
    if (noUnity === false) {
      x = this.unity(x);
      y = this.unity(y);
      width = this.unity(width);
      height = this.unity(height);
    }
    if (angleInRadians !== null) {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.translate(x, y);
      this.ctx.rotate(angleInRadians);
      this.ctx.drawImage(img, -width / 2, -height / 2, width, height);
      this.ctx.closePath();
      this.ctx.restore();
    } else {
      this.ctx.drawImage(img, x, y, width, height);
    }
  },
  clear: function () {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  },
  onScreen: function (x, y, width, height) {
    x = this.unity(x);
    y = this.unity(y);
    width = this.unity(width);
    height = this.unity(height);
    let isOutOfCanvas =
      x + width < 0 - this.unity(camera.target.x) ||
      x - this.unity(camera.target.x) > window.innerWidth / settings.quality ||
      y + height < 0 - this.unity(camera.target.y) ||
      y - this.unity(camera.target.y) > window.innerHeight / settings.quality;
    if (isOutOfCanvas === true) {
      return false;
    }
    return true;
  },
};

export { render };
