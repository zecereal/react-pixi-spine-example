import * as PIXI from 'pixi.js';
import PIXISpine from 'Plugins/pixi-spine';
import PreviewData from 'Game/Data/Preview.json';
import EnvUrl from 'Components/EnvUrl';

const GameContentMain = (app, context, audioRef, updateRatioRef) => {
  const gameData = {
    background: null,
    character: null,
  };
  const containerMain = new PIXI.Container();
  const containerBackground = new PIXI.Container();
  const containerCharacter = new PIXI.Container();
  const onMainResize = (width, height) => {
    containerMain.position.set(width / 2, height / 2);
    containerCharacter.position.set(0, height / 2 - 50);
  };
  updateRatioRef.current.add(onMainResize);
  const onRelease = () => {
    updateRatioRef.current.remove(onMainResize);
    console.log('pixi released');
  };
  const loadCharacter = (characterID) => {
    return new Promise((resolve, reject) => {
      import(`${PreviewData.characters[characterID]}`)
        .then((module) => {
          let moduleClass = module.default;
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
        })
        .catch((e) => {
          console.error(e);
          reject({ error: 'CANNOT_IMPORT_CLASS' });
        });
    });
  };
  const loadLevel = (levelID) => {
    console.log(levelID);
    return new Promise((resolve, reject) => {
      if (PreviewData.levels[levelID]) {
        const preload = new PIXI.Loader();
        preload.add('background', EnvUrl.getGame(PreviewData.levels[levelID]));
        preload.load((loader, resources) => {
          const sprite = new PIXI.Sprite(resources['background'].texture);
          resolve(sprite);
        });
      } else {
        reject({ error: 'CANNOT_FIND_LEVEL' });
      }
    });
  };
  containerMain.addChild(containerBackground);
  containerMain.addChild(containerCharacter);
  app.stage.addChild(containerMain);
  if (!context.main) context.main = {};
  context.main.loadPreview = (characterID, levelID) => {
    //if (gameData.character) gameData.character.destroy();
    //if (gameData.background) gameData.background.destroy();
    const promises = [
      loadCharacter(characterID)
        .then((character) => {
          if (gameData.character) gameData.character.destroy();
          gameData.character = character;
          character.playState('idle');
          const { spine } = character;
          spine.position.set(0, 0);
          containerCharacter.addChild(spine);
          return character;
        })
        .catch((e) => {
          console.error(e);
        }),
      loadLevel(levelID)
        .then((sprite) => {
          if (gameData.background) gameData.background.destroy();
          gameData.background = sprite;
          sprite.width = 800;
          sprite.height = 450;
          sprite.anchor.set(0.5, 0.5);
          sprite.position.set(0, 0);
          containerBackground.addChild(sprite);
        })
        .catch((e) => {
          console.error(e);
        }),
    ];
    return Promise.all(promises)
      .then((results) => {
        const [character, level] = results;
        return [character, level];
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return [app, onRelease];
};

export default GameContentMain;
