<script setup>
import { ref } from "vue";

defineProps({
  loaded: Boolean,
});

const showOnboarding = ref(true);

function enterScene() {
  showOnboarding.value = false;
  if (
    AFRAME.utils.device.checkHeadsetConnected() &&
    !AFRAME.utils.device.isMobile()
  ) {
    document.querySelector("a-scene").enterVR();
  }
  document.querySelector("a-scene").emit("enter-scene");
}
</script>

<template>
  <div id="onboarding" v-if="showOnboarding">
    <div>
      <h1>VR Shooting Range</h1>
      <p v-if="!loaded">loading...</p>
      <button v-if="loaded" @click="enterScene()">Entrer dans la scène</button>
      <div class="licences">
        <section>
          <p>
            Un stand de tir immersif en full VR, conçu pour WebXR avec manettes de jeu.
            La scène est construite avec A-Frame et des assets 3D au format GLB.
            La détection des impacts repose sur un système de raycasting combiné à des OBB colliders,
            permettant une précision par zone sur chaque cible — du viseur central au bord extérieur.
          </p>
        </section>
        <section>
          <h4>Comment jouer</h4>
          <p>
            Choisissez votre mode de difficulté, ramassez le pistolet sur la table,
            visez et appuyez sur le trigger pour tirer. Faites le meilleur score avant la fin du chrono !
          </p>
        </section>
        <section>
          <h4>Source code</h4>
          <blockquote>
            <a href="https://github.com/K-sel/vr-shooting-range-game" target="_blank"
              >GitHub – K-sel/vr-shooting-range-game</a
            >
          </blockquote>
        </section>
        <dl>
          <dt>
            <i>Stack technique</i>
          </dt>
          <dt>
            <a href="https://aframe.io/" target="_blank">A-Frame</a>
          </dt>
          <dd>
            <a
              href="https://github.com/aframevr/aframe/blob/master/LICENSE"
              target="_blank"
              >MIT License</a
            >
          </dd>

          <dt>
            <a href="https://github.com/c-frame/aframe-extras" target="_blank"
              >aframe-extras</a
            >
          </dt>
          <dd>
            <a
              href="https://github.com/c-frame/aframe-extras/blob/master/LICENSE"
              target="_blank"
              >MIT License</a
            >
          </dd>

          <dt>
            <a href="https://vuejs.org/" target="_blank">Vue 3</a>
          </dt>
          <dd>
            <a
              href="https://github.com/vuejs/core/blob/main/LICENSE"
              target="_blank"
              >MIT License</a
            >
          </dd>

          <dt>
            <a href="https://vitejs.dev/" target="_blank">Vite</a>
          </dt>
          <dd>
            <a
              href="https://github.com/vitejs/vite/blob/main/LICENSE"
              target="_blank"
              >MIT License</a
            >
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 1.5rem;
}
a {
  color: #eee;
  text-decoration: none;
}
.licences {
  margin: 2rem 0;
  padding-bottom: 1rem;
  font-size: 1rem;
  text-align: left;
}
.licences dt {
  padding-top: 0.75rem;
  font-size: 0.9rem;
  font-weight: bold;
}
.licences dd {
  margin-left: 0;
  font-size: 0.8rem;
}

#onboarding {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #333;
  color: #ccc;
  width: 100vw;
  height: 100vh;
  padding: 1rem;
  font-family: monospace;
  z-index: 10000;
  overflow: auto;
}
#onboarding > * {
  margin: 0 auto;
  max-width: 50rem;
  width: calc(100vw - 10rem);
  text-align: center;
  border-radius: 0.3rem;
  padding: 1rem;
  font-size: 1.3rem;
}
#onboarding button {
  font-size: 1.3rem;
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  background-color: white;
  color: black;
  border: none;
  cursor: pointer;
}
</style>
#onboarding li { #onboarding li { font-size: 1rem; text-align: left; }
