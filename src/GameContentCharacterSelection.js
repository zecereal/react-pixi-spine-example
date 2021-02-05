import * as PIXI from 'pixi.js';
// eslint-disable-next-line no-unused-vars
import PIXISpine from 'Plugins/pixi-spine';

// eslint-disable-next-line no-unused-vars
const GameContentCharacterSelection = (app, gameContext, audioRef, updateRatioRef) => {
  const containerText = new PIXI.Container();
  const testMessage = new PIXI.Text('This is Character Selection canvas.');
  testMessage.anchor.set(0.5, 0.5);
  containerText.addChild(testMessage);
  app.stage.addChild(containerText);
  return app;
};

export default GameContentCharacterSelection;
