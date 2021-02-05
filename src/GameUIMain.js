import React, { useContext, useState } from 'react';
import { GameContext } from 'Contexts/GameContext';

const GameUIMain = () => {
  const gameContext = useContext(GameContext);
  const [count, setCount] = useState(0);
  console.log(gameContext);
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          gameContext.events.addMessage('WTF');
          setCount((prev) => {
            return prev + 1;
          });
        }}
      >
        {count}
      </button>
    </>
  );
};

export default GameUIMain;
