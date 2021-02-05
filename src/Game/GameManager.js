import React, { memo } from 'react';
import { PixiProvider } from 'Game/PixiContext';
import { GameProvider } from 'Game/GameContext';
import { AppProvider } from 'Game/AppContext';
import PixiApp from 'Game/PixiApp';

const GameManager = ({ width, height, innerWidth, innerHeight, content, children }) => {
  return (
    <AppProvider width={width} height={height} innerWidth={innerWidth} innerHeight={innerHeight}>
      <GameProvider>
        <PixiProvider>
          <PixiApp content={content} />
        </PixiProvider>
        {children}
      </GameProvider>
    </AppProvider>
  );
};

export default memo(GameManager);
