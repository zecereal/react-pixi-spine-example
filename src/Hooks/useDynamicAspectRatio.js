import { useCallback, useLayoutEffect, useState } from 'react';

const useDynamicAspectRatio = (root, aspectRatio, minRatio, maxRatio) => {
  const [innerWidth, setInnerWidth] = useState(0);
  const [innerHeight, setInnerHeight] = useState(0);
  const resizeCallback = useCallback(() => {
    if (!root || isNaN(aspectRatio)) return;
    let size = window.getComputedStyle(root);
    let width = parseInt(size.width.replace('px', ''), 10);
    let height = parseInt(size.height.replace('px', ''), 10);
    let currentRatio = width / height;
    if (currentRatio > minRatio) {
      let adaptWidth = Math.floor(height * minRatio);
      setInnerWidth(adaptWidth);
      setInnerHeight(height);
    } else if (currentRatio < maxRatio) {
      let adaptHeight = Math.floor(width / maxRatio);
      setInnerWidth(width);
      setInnerHeight(adaptHeight);
    } else {
      setInnerWidth(width);
      setInnerHeight(height);
    }
  }, [aspectRatio, maxRatio, minRatio, root]);
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

export default useDynamicAspectRatio;
