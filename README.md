# 🎯 VR Shooting Range

> Un stand de tir immersif en VR, jouable dans votre navigateur — casque, manettes, et c'est parti.

---

## 🕹️ Le projet

Un shooting range interactif construit avec **A-Frame**, **Vue 3** et **Vite**. Ramassez le pistolet sur la table, appuyez sur le chrono et tirez sur les cibles avant que le temps ne s'écoule. Scores, timer, leaderboard — tout est là.

Conçu pour la **VR** (WebXR) avec manettes de jeu.

---

## 🏗️ Architecture

### Scène & assets
La scène principale (`TheScene.vue`) orchestre le tout : chargement des assets GLB (décor, stand, pistolet, table), instanciation des composants Vue et initialisation d'A-Frame.

### Camera Rig
`TheCameraRig.vue` déclare les mains VR (`hand-controls`) gauche et droite. La main droite embarque un raycaster laser activé uniquement une fois le pistolet récupéré.

### Système de tir
Le composant `gun-shoot` écoute les clics souris (desktop) et le trigger manette (VR). Il interroge les intersections du **raycaster** A-Frame pour détecter la zone touchée, lit les **points** via la prop `collider-check` du composant A-Frame personnalisé, et met à jour le score en temps réel.

### Cibles (`TheTarget.vue`)
Les zones de la cible sont générées dynamiquement à partir d'un tableau de définitions :

```js
{ points: 10, color: "#000000", type: "circle", radius: 0.03 }  // bulls-eye
{ points: 7,  color: "#FFD700", type: "ring", ... }
// ...
```

Chaque zone reçoit `collider-check="points: X"` — le composant stocke la valeur de points, récupérable par `gun-shoot` au moment de l'impact.

### Game Manager
`game-manager` (composant A-Frame) pilote la boucle de jeu : démarrage au ramassage du pistolet, compte à rebours de 60s, affichage du score en direct, écran Game Over et sauvegarde du top 3 en localStorage.

---

## 🗂️ Structure rapide

```
src/
├── components/       # Composants Vue (scène, cibles, UI, décor)
├── aframe/           # Composants A-Frame custom (gun-shoot, collider-check, game-manager…)
├── utils/            # Helpers (keyboard, aframe position/rotation)
└── three-addon/      # Post-processing Three.js (bloom, outline)
```

---

## 🚀 Démarrage

```bash
npm ci
npm run dev
```

Pour tester sur casque VR (même réseau) :

```bash
npm run dev-expose
```

---

## 🛠️ Stack

- [A-Frame](https://aframe.io/) — scène WebXR
- [Vue 3](https://vuejs.org/) — composants et réactivité
- [Vite](https://vitejs.dev/) — build & dev server
- [aframe-extras](https://github.com/c-frame/aframe-extras) — movement controls
