AFRAME.registerComponent("gun-shoot", {

  init: function () {
    this.onShoot = this.onShoot.bind(this);

    // Desktop : clic gauche
    this.el.sceneEl.canvas.addEventListener("mousedown", this.onShoot);

    // VR : trigger manette droite
    const rightHand = document.querySelector("#hand-right");
    if (rightHand) {
      rightHand.addEventListener("triggerdown", this.onShoot);
    }
  },

  playSound: function (id) {
    const el = document.querySelector(id);
    if (!el) return;
    el.currentTime = 0;
    el.play();
  },

  onShoot: function () {
    if (!this.el.sceneEl.gameActive) return;
    this.playSound("#snd-gunshot");

    const hits = this.el.components.raycaster.intersectedEls;
    if (hits.length === 0) return;

    const target = hits[0];
    const colliderCheck = target.components["collider-check"];
    if (!colliderCheck) return;

    const points = colliderCheck.data.points;
    const zoneColor = target.getAttribute("color") || "white";

    this.playSound(points === 10 ? "#snd-hitcenter" : "#snd-hit");

    const scoreEl = document.querySelector("#score");
    const newPointsEl = document.querySelector("#newPoints");
    if (!scoreEl) return;

    const current = parseFloat(scoreEl.getAttribute("value")) || 0;
    const newScore = Math.trunc(current + points);
    scoreEl.setAttribute("value", newScore);

    if (newPointsEl) {
      newPointsEl.setAttribute("value", `+${points}`);
      newPointsEl.setAttribute("color", zoneColor);

      if (this._newPointsTimeout) clearTimeout(this._newPointsTimeout);
      this._newPointsTimeout = setTimeout(() => {
        newPointsEl.setAttribute("value", "");
      }, 1500);
    }
  },

  remove: function () {
    this.el.sceneEl.canvas.removeEventListener("mousedown", this.onShoot);
    const rightHand = document.querySelector("#hand-right");
    if (rightHand) {
      rightHand.removeEventListener("triggerdown", this.onShoot);
    }
  },
});
