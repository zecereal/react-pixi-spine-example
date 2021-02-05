import React, { createContext, useContext } from 'react';

const GameContext = createContext({});

const GameProvider = ({ children }) => {
  const context = useContext(GameContext);
  return <GameContext.Provider value={context}>{children}</GameContext.Provider>;
};

const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('Cannot find GameContext.');
  }
  return context;
};

export { GameContext, GameProvider, useGameContext};
