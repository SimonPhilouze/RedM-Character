onNet('playerSpawned', () => {
  emitNet('client:handcheck'); // Request handcheck to server
});

onNet('client:getProfil', (profil) => { // Event trigger when handcheck is done
  if(profil) {
    loadCharacterScene(profil); // second param is first time load or not
  } else {
    exports.charactercreator.createCharacterScene();
  }
});