<template>
  <!-- Score actuel -->
  <a-text
    id="score"
    position="-0.38291 3.31089 -2.41046"
    color="black"
    width="10"
    value="0"
  ></a-text>

  <!-- Points gagnés sur le tir -->
  <a-text
    id="newPoints"
    position="1.39862 1.04124 -2.30834"
    color="black"
    width="10"
    value="0"
  ></a-text>

  <!-- Compte à rebours -->
  <a-text
    id="timer"
    position="-0.38291 3.7 -2.41046"
    color="#E02020"
    width="10"
    value=""
    align="center"
  ></a-text>

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

  <a-text
    id="leaderboard"
    position="-1.92215 1.49578 13.68831"
    color="black"
    width="8"
    line-height="60"
    value="🥇 0 pts
🥈 0 pts
🥉 0 pts"
    rotation="0 40.398681176879215 0"
  ></a-text>
</template>
