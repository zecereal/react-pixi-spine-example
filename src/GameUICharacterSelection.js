import React, { useContext, useState } from 'react';
import { GameContext } from 'Contexts/GameContext';

const GameUICharacterSelection = () => {
  const gameContext = useContext(GameContext);
  console.log(gameContext);
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          gameContext.characterSelection.loadCharacter('123', 'vnd-001');
        }}
      >
        Load Character
      </button>
    </>
  );
};

export default GameUICharacterSelection;
