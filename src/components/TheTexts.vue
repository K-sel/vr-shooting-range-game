<template>
  <!-- Écran CRT vintage — contient #score et #timer -->
  <a-entity id="crt-display" position="-0.20 4.1 -2.8">
    <!-- Boîtier externe (gris foncé, épais) -->
    <a-box
      width="1.10" height="0.72" depth="0.50"
      color="#2A2A2A"
      material="roughness: 0.85; metalness: 0.05"
    ></a-box>

    <!-- Cadre d'écran (encore plus sombre) -->
    <a-box
      width="0.88" height="0.58" depth="0.02"
      color="#1A1A1A"
      material="roughness: 0.9"
      position="0 0 0.26"
    ></a-box>

    <!-- Surface écran (vert foncé émissif = phosphore) -->
    <a-box
      width="0.76" height="0.46" depth="0.015"
      color="#0A1A0A"
      material="emissive: #002200; emissiveIntensity: 0.6; roughness: 0.3"
      position="0 0.02 0.273"
    ></a-box>

    <!-- Label "SCORE" -->
    <a-text
      value="SCORE"
      align="center"
      color="#00CC33"
      width="2.8"
      position="0 0.175 0.285"
      material="shader: flat"
    ></a-text>

    <!-- Valeur du score — conserve id="score" -->
    <a-text
      id="score"
      value="0"
      align="center"
      color="#00FF41"
      width="4.0"
      position="0 0.07 0.285"
      material="shader: flat"
    ></a-text>

    <!-- Séparateur horizontal -->
    <a-box
      width="0.60" height="0.003" depth="0.005"
      color="#005511"
      position="0 -0.02 0.278"
    ></a-box>

    <!-- Label "TIME" -->
    <a-text
      id="time-label"
      value="TIME"
      align="center"
      color="#00CC33"
      width="2.0"
      position="0 -0.07 0.285"
      material="shader: flat"
    ></a-text>

    <!-- Timer — conserve id="timer" -->
    <a-text
      id="timer"
      value=""
      align="center"
      color="#E02020"
      width="3.5"
      position="0 -0.16 0.285"
      material="shader: flat"
    ></a-text>

    <!-- LED verte (indicateur marche) — sur le boîtier, pas l'écran -->
    <a-circle
      radius="0.018"
      color="#00FF41"
      material="emissive: #00FF41; emissiveIntensity: 1.0; shader: flat"
      position="0.38 -0.32 0.255"
    ></a-circle>

    <!-- Marque fabricant — sur le boîtier, pas l'écran -->
    <a-text
      value="MARKSMAN PRO"
      align="center"
      color="#444444"
      width="1.6"
      position="0 -0.33 0.252"
      material="shader: flat"
    ></a-text>
  </a-entity>

  <!-- Cube popup de score — remplace #newPoints -->
  <a-entity
    id="score-popup"
    score-popup
    position="1.39862 1.04124 -2.30834"
    visible="false"
    geometry="primitive: box; width: 0.70; height: 0.70; depth: 0.70"
    material="color: white; opacity: 0.9; transparent: true"
  >
    <!-- Contour noir (légèrement plus grand, en retrait) -->
    <a-text
      data-popup-outline
      value="+0"
      align="center"
      baseline="center"
      color="black"
      width="0.68"
      wrap-count="3"
      position="0 0 0.359"
      material="shader: flat"
    ></a-text>
    <!-- Texte principal blanc (devant) -->
    <a-text
      data-popup-text
      value="+0"
      align="center"
      baseline="center"
      color="white"
      width="0.62"
      wrap-count="3"
      position="0 0 0.361"
      material="shader: flat"
    ></a-text>
  </a-entity>

  <!-- GAME OVER -->
  <a-text
    id="game-over"
    position="0 2.2 -2.41046"
    color="#E02020"
    width="20"
    value="GAME OVER"
    align="center"
    visible="false"
  ></a-text>

  <!-- Hitmark crosshair — apparaît au point d'impact pendant 500ms -->
  <a-entity id="hitmark" hitmark visible="false">
    <!-- Outline noir -->
    <a-box width="0.064" height="0.010" depth="0.001" color="black" material="shader: flat" position="0 0 -0.001"></a-box>
    <a-box width="0.010" height="0.064" depth="0.001" color="black" material="shader: flat" position="0 0 -0.001"></a-box>
    <!-- Croix blanche -->
    <a-box width="0.060" height="0.006" depth="0.002" color="white" material="shader: flat"></a-box>
    <a-box width="0.006" height="0.060" depth="0.002" color="white" material="shader: flat"></a-box>
  </a-entity>
</template>
