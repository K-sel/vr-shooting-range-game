<script setup>
const props = defineProps({
  gunUrl: { required: true },
});

function play() {
  const el = document.querySelector('#snd-guntake');
  if (!el) return;
  el.currentTime = 0;
  el.play();
}
</script>

<template>
  <a-entity
    obb-collider="size: 0.12 0.12 0.22"
    visible="true"
    @obbcollisionstarted="play"
    listen-to="target: #pistol; event:obbcollisionstarted; emit: click"
    event-set="event: click ; attribute : visible ; value : false"
    id="pistol"
    :gltf-model="gunUrl"
    rotation="0 180 90"
    position="0.20315 1.26278 14.99267"
    scale="0.02 0.02 0.02"
  ></a-entity>

  <!-- <a-entity id="pistol-hand" gltf-model="/assets/reddotgun.glb" listen-to="target: #pistol; emit: show" event-set="event: show; attribute: visible; value: true" rotation="38.06960773967242 -179.9998479605043 90" position="0 -0.39549 -1.44591" scale="0.015 0.015 0.015"></a-entity> -->
</template>
