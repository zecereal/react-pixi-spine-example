import React, { useCallback, useContext } from "react";
import { GameContext } from "Game/GameContext";
import { useAppContext } from "Game/AppContext";

const GameState = () => {
  const { innerWidth, innerHeight } = useAppContext();
  const gameContext = useContext(GameContext);
  const onButtonClick = useCallback(
    (e) => {
      e.preventDefault();
      gameContext.createCharacter("vnd-001");
    },
    [gameContext]
  );
  return (
    <div className="gameui" style={{ width: innerWidth, height: innerHeight }}>
      <p>This is React!</p>
      <button onClick={onButtonClick}>Event: Add Message</button>
    </div>
  );
};

export default GameState;
