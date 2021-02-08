import React, { useState, useContext, useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { AppContext } from 'Game/AppContext';
import { PixiContext } from 'Game/PixiContext';

const createPixiApp = (view, options) => {
  PIXI.utils.skipHello();
  const newOptions = { ...options, view };
  let app = new PIXI.Application(newOptions);
  return app;
};

const PixiApp = ({ content, context }) => {
  const { width, height, innerWidth, innerHeight } = useContext(AppContext);
  const pixiContext = useContext(PixiContext);
  const { resolution } = pixiContext;
  const { audioRef, updateRatioRef } = useContext(AppContext);
  const viewRef = useRef();
  const appRef = useRef();
  const [initialOption] = useState({
    ...pixiContext,
    width,
    height,
  });
  useEffect(() => {
    if (appRef.current) {
      console.error("PIXI Application will be reset if context is changed. Please don't change context!");
    } else {
      const [app, onRelease] = content(createPixiApp(viewRef.current, initialOption), context, audioRef, updateRatioRef);
      appRef.current = app;
      return () => {
        onRelease();
      };
    }
  }, []);
  useEffect(() => {
    appRef.current.renderer.resolution = resolution;
  }, [resolution]);
  useEffect(() => {
    appRef.current.renderer.resize(width, height);
    updateRatioRef.current.update(width, height);
  }, [width, height]);
  return <canvas ref={viewRef} style={{ width: innerWidth, height: innerHeight }}></canvas>;
};

export default PixiApp;
