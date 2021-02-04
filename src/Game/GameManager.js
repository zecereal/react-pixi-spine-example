import React from 'react';
import { PixiProvider } from 'Game/PixiContext';
import { GameProvider } from 'Game/GameContext';
import { AppProvider } from 'Game/AppContext';
import PixiApp from 'Game/PixiApp';

const GameManager = ({ root, content, children }) => {
  return (
    <AppProvider root={root}>
      <GameProvider>
        <PixiProvider>
          <PixiApp content={content} />
        </PixiProvider>
        {children}
      </GameProvider>
    </AppProvider>
  );
};

export default GameManager;
