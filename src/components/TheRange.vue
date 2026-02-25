<script setup>
const props = defineProps({
  rangeUrl: { required: true },
});
</script>

<template>
  <a-entity
    id="range"
    position="-0.20206 0.7 -3.9991"
    scale="1.5 1.5 1.5"
    :gltf-model="rangeUrl"
    rotation="0 90 0"
  ></a-entity>
</template>
