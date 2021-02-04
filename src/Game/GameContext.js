import React, { createContext, useContext } from 'react';

const GameContext = createContext({});

const GameProvider = ({ children }) => {
  const context = useContext(GameContext);
  return <GameContext.Provider value={context}>{children}</GameContext.Provider>;
};

export { GameContext, GameProvider };
