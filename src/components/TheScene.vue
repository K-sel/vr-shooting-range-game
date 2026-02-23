<script setup>
import { ref } from "vue";

import TheCameraRig from "./TheCameraRig.vue";
import "../aframe/clickable";
import "../aframe/simple-grab";

const baseUrl = import.meta.env.BASE_URL;
const sceneUrl = `${baseUrl}assets/scene.glb`;
const rangeUrl = `${baseUrl}assets/range.glb`;
const gunUrl = `${baseUrl}assets/sci-fi_gun.glb`;
const tableUrl = `${baseUrl}assets/table.glb`;

const allAssetsLoaded = ref(false);
const visibleGun = ref(false);
</script>

<template>
  <a-scene obb-collider="showColliders: true" stats outline>
    <a-assets @loaded="allAssetsLoaded = true"> </a-assets>
    <template v-if="allAssetsLoaded"></template>

    <!-- Ciel Minecraft bleu clair -->
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
      class="collidable"
      geometry="primitive: box"
      position="0 1 -3"
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
      @click="visibleGun = !visibleGun"
      @obbcollisionstarted="visibleGun = !visibleGun"
      :visible="!visibleGun"
      id="pistol"
      position="-0.15 1.28451 2.00174"
      :gltf-model="gunUrl"
      rotation="90 -180 -9"
    ></a-entity>

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
      :visibleGun="visibleGun"
      position="-0.15 0 3.6"
    />
  </a-scene>
</template>
