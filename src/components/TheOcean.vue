<script setup>
import "../aframe/duplicate.js";
import "../aframe/simple-grab.js";
import "../aframe/clickable.js";
import "../aframe/simple-navmesh-constraint.js";
</script>

<template>
  <a-entity>
    <a-ocean
      color="#a3d0ed"
      width="100"
      depth="100"
      density="50"
      speed="0.1"
      amplitude="0"
      amplitudeVariance="0.1"
      opacity="1"
    ></a-ocean>

    <a-ocean
      color="#a3d0ed"
      width="100"
      depth="100"
      density="50"
      speed="0.1"
      opacity="1"
      amplitude="0"
      amplitudeVariance="0.2"
    ></a-ocean>

    <a-plane data-role="nav-mesh">
      <a-box duplicate color="#FFFFFF" depth="1" height="1" width="1"></a-box>
    </a-plane>

    <a-entity light="type : ambient; color:#fff; intensity : 1"></a-entity>
    <a-entity light="type: point; intensity: 10;" position="0 2 -10"></a-entity>
  </a-entity>
</template>

<style scoped></style>
