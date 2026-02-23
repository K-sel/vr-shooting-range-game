<script setup>
import { ref } from "vue";

import TheCameraRig from "./TheCameraRig.vue";

const baseUrl = import.meta.env.BASE_URL;
const sceneUrl = `${baseUrl}assets/scene.glb`;
const rangeUrl = `${baseUrl}assets/range.glb`;

const allAssetsLoaded = ref(false);
</script>

<template>
  <a-scene>
    <a-assets @loaded="allAssetsLoaded = true"> </a-assets>
    <template v-if="allAssetsLoaded"></template>

    <a-sky color="#87CEEB"></a-sky>
    <a-entity
      id="scene"
      position="0 0 0"
      :gltf-model="sceneUrl"
    ></a-entity>
    
    <TheCameraRig position="0 0 0" />
  </a-scene>
</template>
