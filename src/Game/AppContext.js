/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useRef, useState } from 'react';
import AppAudio from 'Classes/AppAudio';
import UpdateRatio from 'Classes/UpdateRatio';
import DeviceRatio from 'Game/Constants/DeviceRatio';
import useDynamicAspectRatio from 'Hooks/useDynamicAspectRatio';

const AppContext = createContext();

const useExpandRatio = (root, w, h) => {
  const [width, setWidth] = useState(w);
  const [height, setHeight] = useState(h);
  const [aspectRatio] = useState(w / h);
  const [innerWidth, innerHeight] = useDynamicAspectRatio(root, aspectRatio, DeviceRatio.PortraitIpad, DeviceRatio.PortraitAndroid);
  useEffect(() => {
    const screenRatio = innerWidth / innerHeight;
    if (!isNaN(screenRatio)) {
      if (screenRatio < DeviceRatio.PortraitHD) {
        const _h = Math.round(w / screenRatio);
        setWidth(w);
        setHeight(_h);
      } else {
        const _w = Math.round(h * screenRatio);
        setWidth(_w);
        setHeight(h);
      }
    }
  }, [innerWidth, innerHeight]);
  return [width, height, innerWidth, innerHeight];
};

const AppProvider = ({ root, children }) => {
  const audioRef = useRef(new AppAudio());
  const updateRatioRef = useRef(new UpdateRatio());
  const [width, height, innerWidth, innerHeight] = useExpandRatio(root, 720, 1280);
  return <AppContext.Provider value={{ audioRef, updateRatioRef, width, height, innerWidth, innerHeight }}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
