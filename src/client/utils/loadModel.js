const loadModel = async (hash) => {
  RequestModel(hash);
  while(true) {
    if(HasModelLoaded(hash)) {
      console.warn(`HASH LOADED ${hash}`);
      break;
    }
    await sleep(500);
  }
}