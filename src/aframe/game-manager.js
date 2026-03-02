AFRAME.registerComponent("game-manager", {
  schema: {
    duration: { type: "number", default: 60 },
  },

  init() {
    this.gameActive = false;
    this.timeLeft = this.data.duration; 
    this._interval = null;
    this._onGunPickup = this._onGunPickup.bind(this);

    const attachListener = () => {
      const pistol = document.querySelector("#pistol");
      if (pistol) pistol.addEventListener("click", this._onGunPickup);
    };

    if (this.el.sceneEl.hasLoaded) {
      attachListener();
    } else {
      this.el.sceneEl.addEventListener("loaded", attachListener);
    }
  },

  _onGunPickup() {
    if (this.gameActive) return;
    this.gameActive = true;
    this.el.sceneEl.gameActive = true;
    this.timeLeft = this.data.duration;

    // Reset score
    const scoreEl = document.querySelector("#score");
    if (scoreEl) scoreEl.setAttribute("value", "0");

    // Hide game-over from previous game
    const gameOverEl = document.querySelector("#game-over");
    if (gameOverEl) gameOverEl.setAttribute("visible", false);

    // Show timer
    const timerEl = document.querySelector("#timer");
    if (timerEl) timerEl.setAttribute("value", this.timeLeft);

    this._interval = setInterval(() => {
      this.timeLeft--;
      const timerEl = document.querySelector("#timer");
      if (timerEl) timerEl.setAttribute("value", this.timeLeft);

      if (this.timeLeft <= 0) {
        this._endGame();
      }
    }, 1000);
  },

  _endGame() {
    clearInterval(this._interval);
    this.gameActive = false;
    this.el.sceneEl.gameActive = false;

    // Show GAME OVER
    const gameOverEl = document.querySelector("#game-over");
    if (gameOverEl) gameOverEl.setAttribute("visible", true);

    // Return gun to table: reverse the pickup visibility swap
    const pistolHand = document.querySelector("#pistol-hand");
    const pistol = document.querySelector("#pistol");
    if (pistolHand) pistolHand.setAttribute("visible", false);
    if (pistol) pistol.setAttribute("visible", true);

    // Hide timer
    const timerEl = document.querySelector("#timer");
    if (timerEl) timerEl.setAttribute("value", "");

    // Save score and update leaderboard
    const scoreEl = document.querySelector("#score");
    const score = parseFloat(scoreEl?.getAttribute("value")) || 0;
    this._updateLeaderboard(score);
  },

  _updateLeaderboard(score) {
    const stored = JSON.parse(localStorage.getItem("vr-leaderboard") || "[]");
    stored.push(score);
    stored.sort((a, b) => b - a);
    const top3 = stored.slice(0, 3);
    localStorage.setItem("vr-leaderboard", JSON.stringify(top3));

    const lbEl = document.querySelector("#leaderboard-text");
    if (!lbEl) return;

    const medals = ["1.", "2.", "3."];
    const lines = top3.map((s, i) => `${medals[i]} ${s} pts`).join("\n");
    lbEl.setAttribute("value", lines);
  },

  remove() {
    clearInterval(this._interval);
    const pistol = document.querySelector("#pistol");
    if (pistol) pistol.removeEventListener("click", this._onGunPickup);
  },
});
