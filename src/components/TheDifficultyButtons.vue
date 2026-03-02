<template>
  <!-- Label au-dessus des boutons -->
  <a-text
    value="CHOOSE YOUR DIFFICULTY"
    align="center"
    color="#DDDDDD"
    width="1.2"
    position="0.76 1.35 15.06"
    rotation="-90 0 0"
    material="shader: flat"
  ></a-text>

  <!-- Bouton EASY (vert) -->
  <a-entity
    id="btn-easy"
    difficulty-button="difficulty: easy"
    obb-collider="size : 0.1 0.1 0.1;"
    position="0.6325 1.26343 15.06132"
    geometry="primitive: box; width: 0.10; height: 0.04; depth: 0.10"
    material="color: #22AA44"
  >
    <a-text
      value="EASY"
      align="center"
      color="white"
      width="0.6"
      position="0 0.03 0.051"
      material="shader: flat"
    ></a-text>
  </a-entity>

  <!-- Bouton HARD (rouge) -->
  <a-entity
    id="btn-hard"
    difficulty-button="difficulty: hard"
    obb-collider="size : 0.1 0.1 0.1;"
    position="0.88658 1.2625 15.05545"
    geometry="primitive: box; width: 0.10; height: 0.04; depth: 0.10"
    material="color: #CC2222"
  >
    <a-text
      value="HARD"
      align="center"
      color="white"
      width="0.6"
      position="0 0.03 0.051"
      material="shader: flat"
    ></a-text>
  </a-entity>
</template>
