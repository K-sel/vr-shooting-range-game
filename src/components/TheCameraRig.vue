<script setup>
import "../aframe/gun-shoot.js";
import "../aframe/listen-to.js";
import "../aframe/event-set.js";

const props = defineProps({
  allAssetsLoaded: {
    default: false,
  },
  gunUrl: {
    default: null,
  },
});
</script>

<template>
  <a-entity
    id="camera-rig"
    movement-controls="camera: #head;"
    disable-in-vr="component: movement-controls;"
  >
    <a-entity id="head" camera> </a-entity>

    <a-entity id="hand-left" hand-controls="hand: left" obb-collider>
    </a-entity>

    <a-entity
      id="hand-right"
      hand-controls="hand: right"
      obb-collider="size: 0.15 0.15 0.15"
    >
      <a-entity
        listen-to="target: #pistol-hand; event: show; emit: activate"
        event-set="event: activate; attribute: raycaster.far; value: 1000"
        raycaster="far: 0; objects: [clickable], .collidable; showLine: true;"
        gun-shoot
        position="0 -0.0526 -0.15472"
        rotation="-90 0 0"
      >
        <a-circle
          rotation="0 0 0"
          radius="0.001"
          color="green"
          position="0 0 0.013"
        ></a-circle>
      </a-entity>

      <a-entity
        id="pistol-hand"
        :gltf-model="gunUrl"
        visible="false"
        listen-to="target:#pistol ; event:click; emit:show"
        event-set="event: show ; attribute : visible ; value : true"
        scale="0.02 0.02 0.02"
        rotation="90 -180 0"
        position="0 -0.07045 -0.08976"
      >
      </a-entity>
    </a-entity>
  </a-entity>
</template>
