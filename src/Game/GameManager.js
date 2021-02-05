import React, { memo } from "react";
import GameContent from "GameContent";
import { PixiProvider } from "Game/PixiContext";
import { GameProvider } from "Game/GameContext";
import { AppProvider } from "Game/AppContext";
import PixiApp from "Game/PixiApp";

const GameManager = ({ root, children }) => {
  return (
    <AppProvider root={root}>
      <GameProvider>
        <PixiProvider>
          <PixiApp content={GameContent} />
        </PixiProvider>
        {children}
      </GameProvider>
    </AppProvider>
  );
};

export default memo(GameManager);
