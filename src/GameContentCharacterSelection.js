import * as PIXI from 'pixi.js';
import PIXISpine from 'Plugins/pixi-spine';
import Cache from 'Game/Classes/Cache';
import CharacterData from 'Game/Characters/Data.json';

const GameContentCharacterSelection = (app, context, audioRef, updateRatioRef) => {
  const gameData = {
    cacheCharacters: new Cache(),
    activeCharacters: [],
  };
  const containerMain = new PIXI.Container();
  const containerView = new PIXI.Container();
  const onMainResize = (width, height) => {
    containerMain.position.set(width / 2, height / 2);
  };
  updateRatioRef.current.add(onMainResize);
  const onRelease = () => {
    delete gameData.cacheCharacters;
    updateRatioRef.current.remove(onMainResize);
    console.log('pixi released');
  };
  const createCharacter = (characterID) => {
    return new Promise((resolve, reject) => {
      if (gameData.cacheCharacters.exist(characterID)) {
        let moduleClass = gameData.cacheCharacters.get(characterID);
        let characterClass = new moduleClass();
        characterClass
          .create(audioRef.current)
          .then((character) => {
            resolve(character);
          })
          .catch((e) => {
            console.error(e);
            reject({ error: 'CANNOT_LOAD_CHARACTER' });
          });
      } else {
        import(`${CharacterData[characterID]}`)
          .then((module) => {
            let moduleClass = module.default;
            let characterClass = new moduleClass();
            gameData.cacheCharacters.add(characterID, moduleClass);
            characterClass
              .create(audioRef.current)
              .then((character) => {
                resolve(character);
              })
              .catch((e) => {
                console.error(e);
                reject({ error: 'CANNOT_LOAD_CHARACTER' });
              });
          })
          .catch((e) => {
            console.error(e);
            reject({ error: 'CANNOT_IMPORT_CLASS' });
          });
      }
    });
  };
  containerMain.addChild(containerView);
  app.stage.addChild(containerMain);
  if (!context.characterSelection) context.characterSelection = {};
  context.characterSelection.loadCharacter = (uuid, characterID) => {
    return createCharacter(characterID)
      .then((character) => {
        gameData.activeCharacters[uuid] = character;
        const { spine } = character;
        containerView.addChild(spine);
        character.playState('idle');
        spine.position.set(0, 0);
        return character;
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return [app, onRelease];
};

export default GameContentCharacterSelection;
