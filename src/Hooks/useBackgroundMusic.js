import { useEffect, useState } from 'react';
import useSound from './useSound';

const useBackgroundMusic = (audioRef, src, autoplay) => {
  const [isOn, setIsOn] = useState(autoplay);
  const [volume, setVolume] = useState(1.0);
  const [isReady, howlRef] = useSound(
    audioRef,
    {
      src,
      loop: true,
      onload: () => {
        if (isOn) howlRef.current.play();
      },
    },
    'bgm'
  );
  useEffect(() => {
    if (isReady) {
      if (isOn) {
        howlRef.current.play();
      } else {
        howlRef.current.stop();
      }
    }
  }, [howlRef, isOn, isReady]);
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume('bgm', volume);
  }, [audioRef, volume]);
  return [isOn, setIsOn, volume, setVolume];
};

export default useBackgroundMusic;
