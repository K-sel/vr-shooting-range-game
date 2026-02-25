<script setup>
const props = defineProps({
  gunUrl: { required: true },
});
</script>

<template>
  <a-entity
    clickable
    obb-collider
    visible="true"
    listen-to="target: #pistol; event:obbcollisionstarted; emit: click"
    event-set="event: click ; attribute : visible ; value : false"
    id="pistol"
    position="0.20315 1.28451 15.06525"
    :gltf-model="gunUrl"
    rotation="90 -180 -9"
    outline-on-event
  ></a-entity>
</template>
