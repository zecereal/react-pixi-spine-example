import React, { useContext } from 'react';
import { GameContext } from 'Contexts/GameContext';
import GameManager from 'Game/GameManager';
import GameContentMain from 'GameContentMain';
import GameContentCharacterSelection from 'GameContentCharacterSelection';
import GameUIMain from 'GameUIMain';
import GameUICharacterSelection from 'GameUICharacterSelection';
import 'App.css';

const App = ({ root }) => {
  const gameContext = useContext(GameContext);
  return (
    <>
      <GameContext.Provider value={gameContext}>
        <div className="gameCanvas">
          <GameManager width={600} height={360} content={GameContentCharacterSelection} context={gameContext} />
        </div>
        <div className="gameUI">
          <GameUICharacterSelection />
        </div>
      </GameContext.Provider>
    </>
  );
};

export default App;
