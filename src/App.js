import React from 'react';
import GameManager from 'Game/GameManager';
import GameContent from 'GameContent';
import GameState from 'GameState';
import 'App.css';

function App({ root }) {
  return (
    <GameManager root={root} content={GameContent}>
      <GameState />
    </GameManager>
  );
}

export default App;
