onNet('client:handcheck', () => {
  let profil = null;
    
  axios(`http://${apiUrl}:${apiPort}/users/${this.self.getSteamId(global.source)}`)
  .then(response => {
    if(response.status === 200) {
      profil = response.data;
    }
  }).catch(err => {
    if(err) throw err;
  });
  
  emitNet("client:getProfil", global.source, profil);
});