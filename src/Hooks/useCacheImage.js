const { useState, useEffect } = require('react');

const useCacheImage = (srcArray) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  useEffect(() => {
    if (isLoading || isDone) return;
    setIsLoading(true);
    const promises = srcArray.map((src) => {
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.src = src;
        img.onload = resolve();
        img.onerror = reject();
      });
    });
    Promise.all(promises)
      .then(() => {
        setIsDone(true);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setIsDone(false);
        setIsLoading(false);
      });
  }, [isDone, isLoading, srcArray]);
  return [isDone, isLoading];
};

export default useCacheImage;
