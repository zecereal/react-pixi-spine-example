import React, { useCallback, useContext, useEffect, useState } from 'react';
import { GameContext } from 'Contexts/GameContext';

const GameUICharacterSelection = () => {
  const gameContext = useContext(GameContext);
  const [characterList] = useState(['vnd-001', 'vnd-003', 'vnd-004']);
  const [characterSelect, setCharacterSelect] = useState(characterList[0]);
  const [isLoading, setLoading] = useState(false);
  const renderCharacterOptions = useCallback(() => {
    return characterList.map((characterID, index) => {
      return <option key={index}>{characterID}</option>;
    });
  }, [characterList]);
  useEffect(() => {
    if (characterSelect)
      gameContext.characterSelection.loadPreviewCharacter(characterSelect).then(() => {
        setLoading(false);
      });
  }, [characterSelect]);
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
            setLoading(true);
          }}
        >
          {renderCharacterOptions()}
        </select>
      </form>
    </>
  );
};

export default GameUICharacterSelection;
