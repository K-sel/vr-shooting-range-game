<script setup>
import "../aframe/disable-in-vr.js";
import "../aframe/hide-in-vr.js";
import "../aframe/simple-navmesh-constraint.js";
import "../aframe/gun-shoot.js";
import { watch } from "vue";

const props = defineProps({
  allAssetsLoaded: {
    default: false,
  },
  gunUrl: {
    default: null,
  },
  visibleGun: {
    default: false,
  },
});

watch(
  () => props.visibleGun,
  () => {
    const raycaster = document.querySelector("#raycaster");
    if (props.visibleGun) {
      raycaster.setAttribute("gun-shoot");
    } else {
      raycaster.removeAttribute("gun-shoot");
    }
  },
);
</script>

<template>
  <a-entity
    id="camera-rig"
    movement-controls="camera: #head;"
    disable-in-vr="component: movement-controls;"
  >
    <a-entity
      id="head"
      look-controls="pointerLockEnabled: true"
      simple-navmesh-constraint="navmesh: [data-role='nav-mesh']; height: 1.65;"
      disable-in-vr="component: simple-navmesh-constraint;"
      camera
      position="0 1.65 0"
    >
      <a-entity
        geometry="primitive: circle; radius: 0.0003;"
        material="shader: flat; color: white;"
        cursor
        raycaster="far: 4; objects: [clickable]; showLine: false;"
        position="0 0 -0.1"
        disable-in-vr="component: raycaster; disableInAR: false;"
        hide-in-vr="hideInAR: false"
      ></a-entity>

      <a-entity id="dummy-hand-right" position="0.3 -0.3 -0.5">
        <a-entity
          id="raycaster"
          raycaster="objects: .collidable; far: 10;"
          position="0 0 0"
        >
          <a-entity
            v-if="allAssetsLoaded"
            :gltf-model="gunUrl"
            :visible="visibleGun"
            rotation="0 -90 -30"
          >
          </a-entity>
        </a-entity>
      </a-entity>
      <a-entity id="dummy-hand-left" position="-0.3 -0.4 -0.5"></a-entity>
    </a-entity>


    <!-- VR -->
    <a-entity id="hand-left" hand-controls="hand: left"> </a-entity>

    <a-entity id="hand-right" obb-collider hand-controls="hand: right">
      <a-entity
        v-if="allAssetsLoaded"
        :gltf-model="gunUrl"
        :visible="visibleGun"
      ></a-entity>
    </a-entity>
  </a-entity>
</template>
