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

const spawnObject = async (hash, coords) => {
  const hashModel = GetHashKey(hash);
  await loadModel(hashModel);
  const model = CreateObject(hashModel, coords.x, coords.y, coords.z, true, true, true, true, true);
  PlaceObjectOnGroundProperly(model);
  return model;
};

exports('spawnObject', (hash, coords, cb) => {
  // Seems that exports can't return promise or async function, so... callback...
  spawnObject(hash, coords).then((res) => {
    if (cb) return cb(res);
  });
});

const craftObject = async (hash, cb) => {
  console.warn(`PLAYER CREATE OBJECT ${hash}`);
  const playerCoords = getCoords();
  let playerVector = GetEntityForwardVector(getPed());
  const coords = {
    x: playerCoords.x + playerVector[0],
    y: playerCoords.y + playerVector[1],
    z: playerCoords.z,
  };  
  spawnObject(hash, coords, cb);
};

exports('craftObject', (hash, cb) => {
  craftObject(hash).then((res) => {
    if (cb) return cb(res);
  });
});

const changeModel = async (hash) => {
  console.warn(`PLAYER CHANGE MODEL ${hash}`);
  let model = GetHashKey(hash);
  await loadModel(model);
  SetPlayerModel(getId(), model, false);
  N_0x283978a15512b2fe(getPed(), true);
  SetModelAsNoLongerNeeded(model);
};

exports('changeModel', (model) => {
  changeModel(model);
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