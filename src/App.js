import React, { useContext } from 'react';
import { GameContext } from 'Contexts/GameContext';
import GameManager from 'Game/GameManager';
import GameContentMain from 'GameContentMain';
import GameContentCharacterSelection from 'GameContentCharacterSelection';
import GameUIMain from 'GameUIMain';
import GameUICharacterSelection from 'GameUICharacterSelection';
import 'App.css';

const App = ({ root }) => {
  const gameContextMain = useContext(GameContext);
  return (
    <>
      <GameContext.Provider value={gameContextMain}>
        <div className="gameCanvas">
          <GameManager width={600} height={360} content={GameContentMain} context={gameContextMain} />
        </div>
        <div className="gameUI">
          <GameUIMain />
        </div>
      </GameContext.Provider>
      <GameContext.Provider value={gameContextMain}>
        <div className="gameCanvas2">
          <GameManager width={600} height={360} content={GameContentCharacterSelection} context={gameContextMain} />
        </div>
        <div className="gameUI2">
          <GameUICharacterSelection />
        </div>
      </GameContext.Provider>
    </>
  );
};

export default App;
