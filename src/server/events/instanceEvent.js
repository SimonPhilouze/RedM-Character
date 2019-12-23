onNet('playerEnterInstance', () => {
  instancedPlayer = [...instancedPlayer, global.source];
  emitNet('instanciedPlayer', -1, instancedPlayer); // Request handcheck to server
});