import React, { useCallback, useContext, useEffect, useState } from 'react';
import { GameContext } from 'Contexts/GameContext';

const GameUIMain = () => {
  const gameContext = useContext(GameContext);
  const [characterList] = useState(['vnd-001', 'vnd-003', 'vnd-004']);
  const [backgroundList] = useState(['vonder', 'mayurabad']);
  const [characterSelect, setCharacterSelect] = useState(characterList[0]);
  const [backgroundSelect, setBackgroundSelect] = useState(backgroundList[0]);
  const renderCharacterOptions = useCallback(() => {
    return characterList.map((characterID, index) => {
      return <option key={index}>{characterID}</option>;
    });
  }, [characterList]);
  const renderBackgroundOptions = useCallback(() => {
    return backgroundList.map((levelID, index) => {
      return <option key={index}>{levelID}</option>;
    });
  }, [backgroundList]);
  useEffect(() => {
    if (characterSelect && backgroundSelect)
      gameContext.main.loadPreview(characterSelect, backgroundSelect).then(() => {
      });
  }, [backgroundSelect, characterSelect, gameContext.main]);
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <select
          value={characterSelect}
          onChange={(e) => {
            e.preventDefault();
            setCharacterSelect(e.target.value);
          }}
        >
          {renderCharacterOptions()}
        </select>
        <select
          value={backgroundSelect}
          onChange={(e) => {
            e.preventDefault();
            setBackgroundSelect(e.target.value);
          }}
        >
          {renderBackgroundOptions()}
        </select>
      </form>
    </>
  );
};

export default GameUIMain;
