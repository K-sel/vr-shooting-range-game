<script setup>
const props = defineProps({
  position: { default: "-0.20206 1.5 -3.5" },
});

const zones = [
  { points: 10, color: "#000000", type: "circle", radius: 0.03 },
  { points: 7,  color: "#FFD700", type: "ring",   inner: 0.03, outer: 0.08 },
  { points: 5,  color: "#E02020", type: "ring",   inner: 0.08, outer: 0.16 },
  { points: 3,  color: "#2060E0", type: "ring",   inner: 0.16, outer: 0.24 },
  { points: 1,  color: "#EEEEEE", type: "ring",   inner: 0.24, outer: 0.32 },
];
</script>

<template>
  <a-entity id="target" :position="position" rotation="0 0 0">
    <template v-for="zone in zones" :key="zone.points">
      <a-circle
        v-if="zone.type === 'circle'"
        class="collidable"
        :collider-check="`points: ${zone.points}`"
        :radius="zone.radius"
        :color="zone.color"
        material="side: double"
      ></a-circle>
      <a-ring
        v-else
        class="collidable"
        :collider-check="`points: ${zone.points}`"
        :radius-inner="zone.inner"
        :radius-outer="zone.outer"
        :color="zone.color"
        material="side: double"
      ></a-ring>
    </template>
  </a-entity>
</template>
