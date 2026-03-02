AFRAME.registerComponent("hitmark", {
  init: function () {
    this._hideTimeout = null;
  },

  show: function (worldPoint) {
    this.el.object3D.position.copy(worldPoint);
    this.el.object3D.position.z += 0.01;
    this.el.setAttribute("visible", true);
    if (this._hideTimeout) clearTimeout(this._hideTimeout);
    this._hideTimeout = setTimeout(() => {
      this.el.setAttribute("visible", false);
    }, 100);
  },

  remove: function () {
    if (this._hideTimeout) clearTimeout(this._hideTimeout);
  },
});
