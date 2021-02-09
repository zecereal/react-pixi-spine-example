import { useEffect, useState } from 'react';
import useDynamicAspectRatio from 'Hooks/useDynamicAspectRatio';

const useExpandRatio = (root, w, h, minRatio, maxRatio, targetRatio) => {
  const [width, setWidth] = useState(w);
  const [height, setHeight] = useState(h);
  const [aspectRatio] = useState(w / h);
  const [innerWidth, innerHeight] = useDynamicAspectRatio(root, aspectRatio, minRatio, maxRatio);
  useEffect(() => {
    const screenRatio = innerWidth / innerHeight;
    if (!isNaN(screenRatio)) {
      if (screenRatio < targetRatio) {
        const _h = Math.round(w / screenRatio);
        setWidth(w);
        setHeight(_h);
      } else {
        const _w = Math.round(h * screenRatio);
        setWidth(_w);
        setHeight(h);
      }
    }
  }, [w, h, innerWidth, innerHeight, targetRatio]);
  return [width, height, innerWidth, innerHeight];
};

export default useExpandRatio;
