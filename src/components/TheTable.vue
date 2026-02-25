<script setup>
const props = defineProps({
  tableUrl: { required: true },
});
</script>

<template>
  <a-entity
    id="table"
    scale="1.5 2 1.5"
    :gltf-model="tableUrl"
    position="0.16838 0.75089 11.67587"
    rotation="0 90 0"
  ></a-entity>
</template>
