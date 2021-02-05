import React, { memo } from 'react';
import { PixiProvider } from 'Game/PixiContext';
import { AppProvider } from 'Game/AppContext';
import PixiApp from 'Game/PixiApp';

const GameManager = ({ width, height, innerWidth, innerHeight, content, context, children }) => {
  return (
    <AppProvider width={width} height={height} innerWidth={innerWidth} innerHeight={innerHeight}>
      <PixiProvider>
        <PixiApp content={content} context={context} />
      </PixiProvider>
      {children}
    </AppProvider>
  );
};

export default memo(GameManager);
