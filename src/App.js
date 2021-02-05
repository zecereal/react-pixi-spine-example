import React from 'react';
import GameManager from 'Game/GameManager';
import GameContentMain from 'GameContentMain';
import GameUIMain from 'GameUIMain';
import 'App.css';

function App({ root }) {
  return (
    <>
      <div className="gameCanvas">
        <GameManager width={800} height={450} content={GameContentMain} />
      </div>
      <div className="gameui">
        <GameUIMain />
      </div>
    </>
  );
}

export default App;
