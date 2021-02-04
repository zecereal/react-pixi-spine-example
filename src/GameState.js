import React, { useCallback, useContext } from 'react';
import { GameContext } from 'Game/GameContext';

const GameState = () => {
  const gameContext = useContext(GameContext);
  const onButtonClick = useCallback(
    (e) => {
      e.preventDefault();
      gameContext.events.addMessage('This is test message!');
    },
    [gameContext]
  );
  return (
    <div className="gameui">
      <p>This is React!</p>
      <button onClick={onButtonClick}>Event: Add Message</button>
    </div>
  );
};

export default GameState;
