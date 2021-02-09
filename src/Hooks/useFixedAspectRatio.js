import { useCallback, useLayoutEffect, useState } from 'react';

const useFixedAspectRatio = (root, aspectRatio) => {
  const [innerWidth, setInnerWidth] = useState(0);
  const [innerHeight, setInnerHeight] = useState(0);
  const resizeCallback = useCallback(() => {
    if (!root || isNaN(aspectRatio)) return;
    let size = window.getComputedStyle(root);
    let width = parseInt(size.width.replace('px', ''), 10);
    let height = parseInt(size.height.replace('px', ''), 10);
    let currentRatio = width / height;
    if (currentRatio > aspectRatio) {
      let adaptWidth = Math.floor(height * aspectRatio);
      setInnerWidth(adaptWidth);
      setInnerHeight(height);
    } else {
      let adaptHeight = Math.floor(width / aspectRatio);
      setInnerWidth(width);
      setInnerHeight(adaptHeight);
    }
  }, [aspectRatio, root]);
  useLayoutEffect(() => {
    window.addEventListener('resize', resizeCallback);
    window.addEventListener('load', resizeCallback);
    window.addEventListener('focus', resizeCallback);
    resizeCallback();
    return () => {
      window.removeEventListener('resize', resizeCallback);
      window.removeEventListener('load', resizeCallback);
      window.removeEventListener('focus', resizeCallback);
    };
  }, [resizeCallback]);
  return [innerWidth, innerHeight];
};

export default useFixedAspectRatio;
