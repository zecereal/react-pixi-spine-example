import React, { createContext, useContext } from 'react';

const GameContext = createContext({});

const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('Cannot find GameContext.');
  }
  return context;
};

export { GameContext, useGameContext};
