<script setup>
import { ref } from "vue";

import TheCameraRig from "./TheCameraRig.vue";
import "../aframe/clickable";
import "../aframe/simple-grab";
import "../aframe/listen-to.js";
import "../aframe/event-set.js";
import "../aframe/shootable.js";
import "../aframe/collider-check.js";

const baseUrl = import.meta.env.BASE_URL;
const sceneUrl = `${baseUrl}assets/scene.glb`;
const rangeUrl = `${baseUrl}assets/range.glb`;
const gunUrl = `${baseUrl}assets/sci-fi_gun.glb`;
const tableUrl = `${baseUrl}assets/table.glb`;

const allAssetsLoaded = ref(false);
const visibleGun = ref(false);
</script>

<template>
  <a-scene obb-collider="showColliders: false" stats outline>
    <a-assets @loaded="allAssetsLoaded = true"> </a-assets>
    <template v-if="allAssetsLoaded"></template>

    <a-entity pubsub></a-entity>

    <a-sky color="#7EC8E8"></a-sky>

    <a-entity id="scene" position="0 0 0" :gltf-model="sceneUrl"></a-entity>

    <a-entity
      id="range"
      position="-0.20206 0.7 -3.9991"
      scale="1.5 1.5 1.5"
      :gltf-model="rangeUrl"
      rotation="0 90 0"
      class="collidable"
    ></a-entity>

    <a-entity
      id="table"
      scale="1.5 2 1.5"
      :gltf-model="tableUrl"
      position="-0.25461 0.71483 -1.1811"
      rotation="0 90 0"
    ></a-entity>

    <a-entity
      clickable
      obb-collider
      visible="true"
      listen-to="target: #pistol; event:obbcollisionstarted; emit: click"
      event-set="event: click ; attribute : visible ; value : false"
      id="pistol"
      position="-0.15 1.28451 2.00174"
      :gltf-model="gunUrl"
      rotation="90 -180 -9"
      outline-on-event
    ></a-entity>

    <a-text
      id="score"
      position="2.09206 2 1.3392"
      color="black"
      width="10"
      value="0"
      rotation="0 -46.03945066994217 0"
    ></a-text>

    <!-- Cible de tir : 4 couches concentriques -->
    <a-entity id="target" position="-0.20206 1.5 -3.5" rotation="0 0 0">
      <!-- Couche 1 : bullseye (jaune) — 10 pts -->
      <a-ring
        class="collidable"
        collider-check="points: 10"
        radius-inner="0.02"
        radius-outer="0.08"
        color="#FFD700"
        material="side: double"
      ></a-ring>

      <!-- Couche 2 : rouge — 5 pts -->
      <a-ring
        class="collidable"
        collider-check="points: 5"
        radius-inner="0.08"
        radius-outer="0.16"
        color="#E02020"
        material="side: double"
      ></a-ring>

      <!-- Couche 3 : bleu — 3 pts -->
      <a-ring
        class="collidable"
        collider-check="points: 3"
        radius-inner="0.16"
        radius-outer="0.24"
        color="#2060E0"
        material="side: double"
      ></a-ring>

      <!-- Couche 4 : blanc (extérieur) — 1 pt -->
      <a-ring
        class="collidable"
        collider-check="points: 1"
        radius-inner="0.24"
        radius-outer="0.32"
        color="#EEEEEE"
        material="side: double"
      ></a-ring>
    </a-entity>

    <a-plane
      data-role="nav-mesh"
      position="-0.15 0 3.6"
      rotation="-90 0 0"
      width="2"
      height="2"
      visible="false"
      opacity="0.3"
    ></a-plane>

    <TheCameraRig
      :allAssetsLoaded="allAssetsLoaded"
      :gunUrl="gunUrl"
      position="-0.077 0 3.07"
    />
  </a-scene>
</template>
