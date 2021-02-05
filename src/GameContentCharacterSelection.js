import * as PIXI from 'pixi.js';
// eslint-disable-next-line no-unused-vars
import PIXISpine from 'Plugins/pixi-spine';

// eslint-disable-next-line no-unused-vars
const GameContentCharacterSelection = (app, context, audioRef, updateRatioRef) => {
  const containerText = new PIXI.Container();
  const testMessage = new PIXI.Text('This is Character Selection canvas.');
  containerText.addChild(testMessage);
  app.stage.addChild(containerText);
  if (!context.events) context.events = {};
  context.events.addMessage2 = (message) => {
    const text = new PIXI.Text(message);
    containerText.addChild(text);
    const index = containerText.children.length;
    text.position.set(0, (index - 1) * 30);
  };
  return app;
};

export default GameContentCharacterSelection;
