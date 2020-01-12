const loadCharacterScene = async (profil) => {
  let { lastName, firstName, money, skin, jobs, position} = profil[0];
  console.warn(`LOAD CHARACTER ${lastName} ${firstName}`);
  
  setCoords(position[0], position[1], position[2]);
  DestroyAllCams();
  
  await changeModel(skin[0].hash); // id 0 is always the model
  await sleep(3000);

  // SKIN
  let clothes = [...skin];
  clothes.splice(0,1); // remove the first "cloth" because it's the model
  clothes.forEach(cloth => {
    changeClothes(cloth.hash);
  });
}

exports('loadCharacterScene', (profil) => {
  loadCharacterScene(profil);
});