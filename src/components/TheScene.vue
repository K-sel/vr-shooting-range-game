<script setup>
import { ref } from "vue";

import TheCameraRig from "./TheCameraRig.vue";
import TheTarget from "./TheTarget.vue";
import TheRange from "./TheRange.vue";
import TheTable from "./TheTable.vue";
import TheGunOnTable from "./TheGunOnTable.vue";
import TheTexts from "./TheTexts.vue";
import TheNavMesh from "./TheNavMesh.vue";
import TheLeaderboard from "./TheLeaderboard.vue";

import "../aframe/clickable";
import "../aframe/simple-grab";
import "../aframe/listen-to.js";
import "../aframe/event-set.js";
import "../aframe/shootable.js";
import "../aframe/collider-check.js";
import "../aframe/game-manager.js";
import "../aframe/score-popup.js";

const baseUrl = import.meta.env.BASE_URL;
const sceneUrl = `${baseUrl}assets/scene.glb`;
const rangeUrl = `${baseUrl}assets/range.glb`;
const gunUrl = `${baseUrl}assets/reddotgun.glb`;
const tableUrl = `${baseUrl}assets/table.glb`;
const gunshotUrl = `${baseUrl}assets/gunshot.mp3`;
const takeUrl = `${baseUrl}assets/guntake.mp3`;
const hitCenterUrl = `${baseUrl}assets/hitcenter.mp3`;

const allAssetsLoaded = ref(false);
</script>

<template>
  <a-scene obb-collider="showColliders: false" stats outline>
    <a-assets @loaded="allAssetsLoaded = true">
      <audio id="snd-gunshot" :src="gunshotUrl" preload="auto"></audio>
      <audio id="snd-guntake" :src="takeUrl" preload="auto"></audio>
      <audio id="snd-hitcenter" :src="hitCenterUrl" preload="auto"></audio>
    </a-assets>
    <template v-if="allAssetsLoaded"></template>

    <a-entity pubsub></a-entity>
    <a-entity game-manager></a-entity>

    <a-sky color="#7EC8E8"></a-sky>

    <a-entity id="scene" position="0 0 0" :gltf-model="sceneUrl"></a-entity>

    <TheRange :rangeUrl="rangeUrl" />

    <a-entity id="section-table" position="0 0 -8.43084">
      <TheTable :tableUrl="tableUrl" />
      <TheGunOnTable :gunUrl="gunUrl" />
      <TheLeaderboard />
      <TheCameraRig
        :allAssetsLoaded="allAssetsLoaded"
        :gunUrl="gunUrl"
        position="0.23221 0.69323 16.34931"
      />
    </a-entity>

    <TheTexts />
    <TheTarget />
    <TheNavMesh />
  </a-scene>
</template>
