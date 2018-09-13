const asyncFunc = async () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res('Yay');
    }, 1000)
  });
};

(async () => {
  const result = await asyncFunc();
  log.info(result); 
})();