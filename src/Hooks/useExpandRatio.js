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
        setWidth((prev) => {
          if (prev != w) return w;
        });
        setHeight((prev) => {
          if (prev != _h) return _h;
        });
      } else {
        const _w = Math.round(h * screenRatio);
        setWidth((prev) => {
          if (prev != _w) return _w;
        });
        setHeight((prev) => {
          if (prev != h) return h;
        });
      }
    }
  }, [innerWidth, innerHeight]);
  return [width, height, innerWidth, innerHeight];
};

export default useExpandRatio;
