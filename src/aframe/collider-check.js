AFRAME.registerComponent("collider-check", {
  dependencies: ["raycaster"],
  schema: {
    score: { type: "number", default: 0 },
    points: { type: "number", default: 0 },
  },

  init: function () {
    this.el.addEventListener("raycaster-intersection", () =>
      this.onCollision(),
    );
  },

  onCollision: function () {
    document
      .querySelector("#score")
      .setAttribute("value", Math.trunc(this.data.score + this.data.points));
    this.data.score += this.data.points;
  },
});
