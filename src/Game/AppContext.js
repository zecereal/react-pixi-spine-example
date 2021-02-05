/* eslint-disable no-unused-vars */
import React, { createContext, useRef, useContext } from 'react';
import AppAudio from 'Classes/AppAudio';
import UpdateRatio from 'Classes/UpdateRatio';

const AppContext = createContext();

const AppProvider = ({ width, height, innerWidth, innerHeight, children }) => {
  const audioRef = useRef(new AppAudio());
  const updateRatioRef = useRef(new UpdateRatio());
  return <AppContext.Provider value={{ audioRef, updateRatioRef, width, height, innerWidth, innerHeight }}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('Cannot find AppContext.');
  }
  return context;
};

export { AppContext, AppProvider, useAppContext };
