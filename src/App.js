import React from "react";
import GameManager from "Game/GameManager";
import GameState from "GameState";
import "App.css";

function App({ root }) {
  return (
    <GameManager root={root}>
      <GameState />
    </GameManager>
  );
}

export default App;
