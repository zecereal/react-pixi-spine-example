import * as PIXI from 'pixi.js';
// eslint-disable-next-line no-unused-vars
import PIXISpine from 'Plugins/pixi-spine';

// eslint-disable-next-line no-unused-vars
const GameContent = (app, gameContext, audioRef, updateRatioRef) => {
  const containerMain = new PIXI.Container();
  const containerText = new PIXI.Container();
  const testMessage = new PIXI.Text('This is Pixi.js');
  // Set anchor of text message to the middle-center.
  testMessage.anchor.set(0.5, 0.5);
  updateRatioRef.current.addCallback('main', (width, height) => {
    containerMain.position.set(width / 2, height / 2);
  });
  containerMain.addChild(testMessage);
  app.stage.addChild(containerMain);
  app.stage.addChild(containerText);
  gameContext.events = {
    addMessage: (message) => {
      const text = new PIXI.Text(message);
      containerText.addChild(text);
      const index = containerText.children.length;
      text.position.set(0, (index - 1) * 30);
    },
  };
  return app;
};

export default GameContent;
