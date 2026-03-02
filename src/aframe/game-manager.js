AFRAME.registerComponent("game-manager", {
  schema: {
    duration: { type: "number", default: 20 },
  },

  init() {
    this.gameActive = false;
    this.timeLeft = this.data.duration;
    this._interval = null;
    this._difficulty = "easy";
    this._onGunPickup = this._onGunPickup.bind(this);

    this.el.sceneEl.difficulty = "easy";
    this.el.sceneEl.hitmarkEnabled = true;

    this.el.sceneEl.addEventListener("difficulty-changed", (e) => {
      this._difficulty = e.detail.difficulty;
      this.el.sceneEl.hitmarkEnabled = this._difficulty === "easy";
      this._refreshLeaderboard();
    });

    const attachListener = () => {
      const pistol = document.querySelector("#pistol");
      if (pistol) pistol.addEventListener("click", this._onGunPickup);
      this._refreshLeaderboard();
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

    // Restore TIME label and timer display
    const timeLabelEl = document.querySelector("#time-label");
    if (timeLabelEl) timeLabelEl.setAttribute("visible", true);
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

    // Show GAME OVER on CRT in place of the timer
    const timeLabelEl = document.querySelector("#time-label");
    if (timeLabelEl) timeLabelEl.setAttribute("visible", false);
    const timerEl = document.querySelector("#timer");
    if (timerEl) timerEl.setAttribute("value", "GAME OVER");

    // Return gun to table
    const pistolHand = document.querySelector("#pistol-hand");
    const pistol = document.querySelector("#pistol");
    if (pistolHand) pistolHand.setAttribute("visible", false);
    if (pistol) pistol.setAttribute("visible", true);

    // Save score and update leaderboard
    const scoreEl = document.querySelector("#score");
    const score = parseFloat(scoreEl?.getAttribute("value")) || 0;
    this._updateLeaderboard(score);
  },

  _updateLeaderboard(score) {
    const key = `vr-leaderboard-${this._difficulty}`;
    const stored = JSON.parse(localStorage.getItem(key) || "[]");
    stored.push(score);
    stored.sort((a, b) => b - a);
    const top3 = stored.slice(0, 3);
    localStorage.setItem(key, JSON.stringify(top3));
    this._refreshLeaderboard();
  },

  _refreshLeaderboard() {
    const key = `vr-leaderboard-${this._difficulty}`;
    const top3 = JSON.parse(localStorage.getItem(key) || "[]");

    const lbEl = document.querySelector("#leaderboard-text");
    if (lbEl) {
      const medals = ["1.", "2.", "3."];
      const lines = medals.map((m, i) => `${m} ${top3[i] ?? 0} pts`).join("\n");
      lbEl.setAttribute("value", lines);
    }

    const titleEl = document.querySelector("#leaderboard-title");
    if (titleEl) {
      titleEl.setAttribute("value", this._difficulty.toUpperCase());
      titleEl.setAttribute("color", this._difficulty === "easy" ? "#22AA44" : "#CC2222");
    }
  },

  remove() {
    clearInterval(this._interval);
    const pistol = document.querySelector("#pistol");
    if (pistol) pistol.removeEventListener("click", this._onGunPickup);
  },
});
