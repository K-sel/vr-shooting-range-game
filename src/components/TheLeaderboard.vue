<template>
  <!-- Porte-document leaderboard — posé sur la table -->
  <a-entity
    id="leaderboard"
    position="-0.3005 1.2582 14.98992"
    rotation="-90 0 0"
  >
    <!-- Feuille A4 (crème, format portrait) -->
    <a-box
      width="0.28" height="0.40" depth="0.010"
      color="#F5F0E8"
      material="roughness: 0.9"
      position="-0.00139 0 0"
    ></a-box>

    <!-- Clip supérieur (marron foncé) -->
    <a-box
      width="0.18" height="0.045" depth="0.022"
      color="#5C3317"
      material="metalness: 0.2; roughness: 0.6"
      position="0 0.195 0.005"
    ></a-box>

    <!-- Anneau métallique -->
    <a-torus
      radius="0.020" radius-tubular="0.004"
      color="#AAAAAA"
      material="metalness: 0.8; roughness: 0.3"
      rotation="90 0 0"
      position="0 0.212 0.006"
    ></a-torus>

    <!-- Lignes réglées décoratives -->
    <a-box width="0.22" height="0.003" depth="0.001" color="#CCCCCC" position="0 -0.15283 0.006"></a-box>
    <a-box width="0.22" height="0.003" depth="0.001" color="#CCCCCC" position="0 -0.00031 0.006"></a-box>
    <a-box width="0.22" height="0.003" depth="0.001" color="#CCCCCC" position="0 -0.07692 0.006"></a-box>

    <!-- En-tête "TOP SCORES" -->
    <a-text
      id="leaderboard-title"
      value="EASY"
      align="center"
      color="#22AA44"
      width="1.4"
      position="-0.0017 0.12616 0.007"
    ></a-text>

    <!-- Scores — game-manager.js cible CET id -->
    <a-text
      id="leaderboard-text"
      value="1. 0 pts&#10;2. 0 pts&#10;3. 0 pts"
      align="left"
      color="#222222"
      width="1.2"
      line-height="60"
      position="-0.11644 -0.03598 0.007"
    ></a-text>
  </a-entity>
</template>
