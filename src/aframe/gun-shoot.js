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

    const intersections = this.el.components.raycaster.intersections;
    const point = intersections.length > 0 ? intersections[0].point : null;

    const target = hits[0];
    const colliderCheck = target.components["collider-check"];
    if (!colliderCheck) return;

    const points = colliderCheck.data.points;
    const zoneColor = target.getAttribute("color") || "white";

    this.playSound(points === 10 ? "#snd-hitcenter" : "#snd-hit");

    const scoreEl = document.querySelector("#score");
    if (!scoreEl) return;

    const current = parseFloat(scoreEl.getAttribute("value")) || 0;
    const newScore = Math.trunc(current + points);
    scoreEl.setAttribute("value", newScore);

    const popupEl = document.querySelector("#score-popup");
    if (popupEl) {
      popupEl.emit("show-popup", { points, color: zoneColor });
    }

    const hitmarkEl = document.querySelector("#hitmark");
    if (hitmarkEl && point && this.el.sceneEl.hitmarkEnabled !== false) {
      hitmarkEl.components.hitmark.show(point);
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
