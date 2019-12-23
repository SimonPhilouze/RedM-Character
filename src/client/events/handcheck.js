
onNet('playerSpawned', () => {
  emitNet('client:handcheck'); // Request handcheck to server
});

onNet('client:getProfil', async (profil) => { // Event trigger when handcheck is done
  if(profil) {
    loadCharacterScene(profil);
  } else {
    createCharacterScene();
  }
});