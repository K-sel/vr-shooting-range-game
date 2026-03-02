AFRAME.registerComponent("score-popup", {
  init: function () {
    this._hideTimeout = null;
    this._spinning = false;
    this._spinElapsed = 0;
    this._onShowPopup = this._onShowPopup.bind(this);
    this.el.addEventListener("show-popup", this._onShowPopup);
  },

  _onShowPopup: function (evt) {
    const { points, color } = evt.detail;

    const textEl = this.el.querySelector("[data-popup-text]");
    if (textEl) textEl.setAttribute("value", `+${points}`);

    const outlineEl = this.el.querySelector("[data-popup-outline]");
    if (outlineEl) outlineEl.setAttribute("value", `+${points}`);

    this.el.setAttribute("material", `color: ${color}; opacity: 0.9; transparent: true`);
    this.el.setAttribute("visible", true);

    // Restart spin
    this._spinning = true;
    this._spinElapsed = 0;

    if (this._hideTimeout) clearTimeout(this._hideTimeout);
    this._hideTimeout = setTimeout(() => {
      this.el.setAttribute("visible", false);
    }, 1500);
  },

  tick: function (_time, delta) {
    if (!this._spinning) return;
    this._spinElapsed += delta;
    const t = Math.min(this._spinElapsed / 800, 1);
    const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    this.el.object3D.rotation.y = ease * Math.PI * 2;
    if (this._spinElapsed >= 800) {
      this._spinning = false;
      this.el.object3D.rotation.y = 0;
    }
  },

  remove: function () {
    this.el.removeEventListener("show-popup", this._onShowPopup);
    if (this._hideTimeout) clearTimeout(this._hideTimeout);
  },
});
