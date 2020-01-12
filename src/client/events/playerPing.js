// Each x second send event to server and get ping of player
setInterval(() => {
  emitNet('client:getPing');
}, 10000);

onNet('client:getPong', (playerPing) => {
  console.warn(`${playerPing} ms`);
});