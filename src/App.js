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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 'large' }}>Main Menu Preview</h1>
          <GameContext.Provider value={gameContext}>
            <div className="gameCanvas">
              <GameManager width={800} height={450} content={GameContentMain} context={gameContext} />
            </div>
            <div className="gameUI">
              <GameUIMain />
            </div>
          </GameContext.Provider>
        </div>
        <div>
          <h1 style={{ fontSize: 'large' }}>Character Selection Preview</h1>
          <GameContext.Provider value={gameContext}>
            <div className="gameCanvas">
              <GameManager width={600} height={360} content={GameContentCharacterSelection} context={gameContext} />
            </div>
            <div className="gameUI">
              <GameUICharacterSelection />
            </div>
          </GameContext.Provider>
        </div>
      </div>
    </>
  );
};

export default App;
