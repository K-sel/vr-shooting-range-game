AFRAME.registerComponent("gun-shoot", {
  dependencies: ["raycaster"],

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

  onShoot: function (e) {
    const hits = this.el.components.raycaster.intersectedEls;
    if (hits.length > 0) {
      console.log(
        "Pistolet touche :",
        hits[0].id || hits[0].className,
        hits[0],
      );
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
