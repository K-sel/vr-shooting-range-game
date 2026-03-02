AFRAME.registerComponent("score-popup", {
  init: function () {
    this._hideTimeout = null;
    this._spinRafId = null;
    this._onShowPopup = this._onShowPopup.bind(this);
    this.el.addEventListener("show-popup", this._onShowPopup);
  },

  _onShowPopup: function (evt) {
    const { points, color } = evt.detail;

    // Update text on front face
    const textEl = this.el.querySelector("[data-popup-text]");
    if (textEl) textEl.setAttribute("value", `+${points}`);

    // Update cube color
    this.el.setAttribute("material", `color: ${color}; opacity: 0.9; transparent: true`);

    // Show the cube
    this.el.setAttribute("visible", true);

    // Reset animation cleanly (handles rapid hits)
    if (this._spinRafId) cancelAnimationFrame(this._spinRafId);
    this.el.removeAttribute("animation__spin");
    this._spinRafId = requestAnimationFrame(() => {
      this._spinRafId = null;
      this.el.setAttribute(
        "animation__spin",
        "property: rotation; from: 0 0 0; to: 0 360 0; dur: 800; easing: easeInOutQuad; startEvents: spin-start"
      );
      this.el.emit("spin-start");
    });

    // Hide after 1500ms
    if (this._hideTimeout) clearTimeout(this._hideTimeout);
    this._hideTimeout = setTimeout(() => {
      this.el.setAttribute("visible", false);
    }, 1500);
  },

  remove: function () {
    this.el.removeEventListener("show-popup", this._onShowPopup);
    if (this._hideTimeout) clearTimeout(this._hideTimeout);
    if (this._spinRafId) cancelAnimationFrame(this._spinRafId);
  },
});
