AFRAME.registerComponent("difficulty-button", {
  schema: { difficulty: { type: "string", default: "easy" } },

  init() {
    this._activate = this._activate.bind(this);
    this.el.addEventListener("obbcollisionstarted", this._activate);
    this.el.addEventListener("click", this._activate);
  },

  _activate() {
    const scene = this.el.sceneEl;
    if (scene.gameActive) return;
    scene.difficulty = this.data.difficulty;
    scene.hitmarkEnabled = this.data.difficulty === "easy";
    scene.emit("difficulty-changed", { difficulty: this.data.difficulty });

    // Son
    const sndId =
      this.data.difficulty === "easy" ? "#snd-easy-clicked" : "#snd-hard-clicked";
    const snd = document.querySelector(sndId);
    if (snd) {
      snd.currentTime = 0;
      snd.play();
    }

    // Animation : scale down puis restore
    this.el.setAttribute("scale", "0.85 0.85 0.85");
    setTimeout(() => {
      this.el.setAttribute("scale", "1 1 1");
    }, 150);
  },

  remove() {
    this.el.removeEventListener("obbcollisionstarted", this._activate);
    this.el.removeEventListener("click", this._activate);
  },
});
