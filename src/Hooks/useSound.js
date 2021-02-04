import { useRef, useEffect, useState } from 'react';

const useSound = (audioRef, options, group) => {
  const [isReady, setIsReady] = useState(false);
  const howlRef = useRef();
  useEffect(() => {
    audioRef.current
      .loadAsync(options, group)
      .then((howl) => {
        howlRef.current = howl;
        setIsReady(true);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [howlRef]);
  return [isReady, howlRef];
};

export default useSound;
