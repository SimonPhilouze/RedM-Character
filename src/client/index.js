const getCoords = () => {
  let coords =  GetEntityCoords(GetPlayerPed(GetPlayerIndex()));
  return {
    "x" : coords[0],
    "y" : coords[1],
    "z" : coords[2]
  }
};

exports('getCoords', getCoords);

const setCoords = (x, y, z) => {
  console.warn(`PLAYER SET POSITION TO X : ${x} Y: ${y} Z : ${z}`); 
  SetEntityCoords(getPed(), parseInt(x), parseInt(y), parseInt(z), 0, 0, 0, false);
};

exports('setCoords', setCoords);

const getPed = () => {
  return GetPlayerPed(GetPlayerIndex());
};

exports('getPed', getPed);

const getPlayerId = () => {
  return PlayerPedId();
}

exports('getPlayerId', getPlayerId);

const getId = () => {
  return GetPlayerIndex();
};

exports('getId', getId);

const getVector = () => {
  return GetEntityForwardVector(getPed());
}; 

exports('getVector', getVector);

const playScenario = async (scenario, delay) => {
  console.warn(`PLAYER PLAY ${scenario} DURING ${delay} MS`); 
  TaskStartScenarioInPlace(getPed(), GetHashKey(scenario), 0, false);
  await sleep(delay);
  ClearPedTasks(getPed());
  console.warn(`PLAYER STOP ${scenario}`); 
};

exports('playScenario', (scenario, delay) => { // IF IT'S ASYNC FUNCTION 
  playScenario(scenario, delay);
});

const createEntity = async (entity) => {
  console.warn(`PLAYER CREATE ENTITY ${entity}`);
  const coords = getCoords();
  const ped = GetHashKey(entity);
  await loadModel(ped);
  let pedInstance = CreatePed(ped, coords.x, coords.y - 2, coords.z + 0.95, 0.0, true, true, true, true);
  N_0x283978a15512b2fe(pedInstance, true); // i think it's force reload texture ped
};

exports('createEntity', (entity) => {
  createEntity(entity);
});

const giveWeapon = (weapon) => {
  if(IsWeaponValid(weapon.weapon.asset)) {
    console.warn(`PLAYER GIVE WEAPON ${weapon.weapon.asset}`);
    const weaponHash = GetHashKey(weapon.weapon.asset);
    GiveDelayedWeaponToPed(getPed(), weaponHash, weapon.ammo, true, false);
  } else {
    console.error("INVALID WEAPON");
  }
};

exports('giveWeapon', giveWeapon);

const craftObject = async (hash) => {
  console.warn(`PLAYER CREATE OBJECT ${hash}`);
  const coords = getCoords();
  const hashModel = GetHashKey(hash);
  await loadModel(hashModel);
  let playerVector = GetEntityForwardVector(getPed());
  const model = CreateObject(hashModel, coords.x + playerVector[0], coords.y + playerVector[1] , coords.z, true, true, true, true, true);
  PlaceObjectOnGroundProperly(model);
};

exports('craftObject', (hash) => {
  craftObject(hash);
});

const changeModel = async (hash) => {
  console.warn(`PLAYER CHANGE MODEL ${hash}`);
  let model = GetHashKey(hash);
  await loadModel(model);
  SetPlayerModel(getId(), model, false);
  N_0x283978a15512b2fe(getPed(), true);
  SetModelAsNoLongerNeeded(model);
  return true;
};

exports('changeModel', (model) => {
  changeModel(model);
});

const setSoloInstance = async (active) => {
  console.warn(`SOLO INSTANCE ${active}`);
  // get all entities id and hide them all 
}

exports('setSoloInstance', (active) => {
  setSoloInstance(active);
});

const changeClothes = (hash) => {
  console.warn(`CHANGE CLOTHES BY ${hash}`);
  if (!hash.startsWith('0x')) {
    hash = '0x' + hash;
  }

  N_0xd3a7b003ed343fd9(getPlayerId(), parseInt(hash), true, true, true);
}

exports('changeClothes', (hash) => {
  changeClothes(hash);
});