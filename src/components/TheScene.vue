<script setup>
import { ref } from "vue";

import TheCameraRig from "./TheCameraRig.vue";
import TheOcean from "./TheOcean.vue";
import TheSky from "./TheSky.vue";

const allAssetsLoaded = ref(false);
</script>

<template>
  <a-scene
    fog="type: linear; color: #a3d0ed near : 100; density :100; far : 60"
    stats
  >
    <a-assets @loaded="allAssetsLoaded = true"> </a-assets>
    <template v-if="allAssetsLoaded"></template>

    <TheSky />
    <TheOcean />
    <TheCameraRig />
  </a-scene>
</template>
