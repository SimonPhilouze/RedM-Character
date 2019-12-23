const createCharacterScene = () => {
  console.warn('Creating Character Scene');

  exports.character.setCoords(2546, -1309, 49); // inside theatre

  let createCharacterCam = CreateCam("DEFAULT_SCRIPTED_FLY_CAMERA", true);

  AttachCamToEntity(createCharacterCam, exports.character.getPed(), 0.0, 1.9, 0.5, true);
  SetCamRot(createCharacterCam, 175, 180, 0, 0);
  SetCamFov(createCharacterCam, 80);
  RenderScriptCams(true, false, 0, 1, 0);
  DisplayHud(false);
}