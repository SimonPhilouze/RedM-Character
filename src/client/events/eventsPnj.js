setTick(() => { // SHOULD TRIGGER EVENT IF FOCUS ENTITY AND NEED TO CHECK IF IT IS A PNJ YES ENABLE WEB INTERFACE
  if (IsPlayerTargettingAnything(exports.character.getId())) {
    console.log(GetPlayerTargetEntity(exports.character.getId()));
  }
});