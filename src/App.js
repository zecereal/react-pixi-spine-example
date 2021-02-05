import React from 'react';
import GameManager from 'Game/GameManager';
import GameState from 'GameState';
import GameContent from 'GameContentMain';
import DeviceRatio from 'Constants/DeviceRatio';
import useExpandRatio from 'Hooks/useExpandRatio';
import 'App.css';

function App({ root }) {
  const [width, height, innerWidth, innerHeight] = useExpandRatio(root, 1280, 720, DeviceRatio.LandscapeAndroid, DeviceRatio.LandscapeIpad, DeviceRatio.LandscapeHD);
  const [width2, height2, innerWidth2, innerHeight2] = useExpandRatio(root, 720, 1280, DeviceRatio.PortraitIpad, DeviceRatio.PortraitAndroid, DeviceRatio.PortraitHD);
  return (
    <>
      <GameManager width={width} height={height} innerWidth={innerWidth} innerHeight={innerHeight} content={GameContent}>
        <GameState />
      </GameManager>
      <GameManager width={width2} height={height2} innerWidth={innerWidth2} innerHeight={innerHeight2} content={GameContent}>
        <GameState />
      </GameManager>
    </>
  );
}

export default App;
