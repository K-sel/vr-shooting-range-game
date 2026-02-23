AFRAME.registerComponent("duplicate", {
  schema: {
    tileSize: { type: "number", default: 1 },
    cols: { type: "number", default: 20 },
    rows: { type: "number", default: 20 },
    offset: { type: "number", default: 0.01 },
  },

  init: function () {
    const entity = document.createElement("a-entity");
    const target = this.el;

    const originalClone = target.cloneNode(true);
    originalClone.removeAttribute("duplicate");
    target.setAttribute("opacity", 1);
    target.setAttribute("color", "#000000");

    for (let i = 0; i < this.data.rows; i++) {
      for (let j = 0; j < this.data.cols; j++) {
        const clone = originalClone.cloneNode(true);

        clone.setAttribute("position", {
          x: (this.data.offset + this.data.tileSize) * j,
          z: (this.data.offset + this.data.tileSize) * i,
          y: Math.random() * 0.05, // Add a slight random height variation for visual interest
        });
        entity.appendChild(clone);
      }
    }
    entity.setAttribute("position", {
      x: -((this.data.cols * (this.data.tileSize + this.data.offset)) / 2),
      y: target.getAttribute("position").y,
      z: -((this.data.rows * (this.data.tileSize + this.data.offset)) / 2),
    });
    target.appendChild(entity);
  },
});
