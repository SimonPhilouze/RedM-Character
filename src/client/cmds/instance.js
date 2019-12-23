RegisterCommand('instance', (source, args) => {
  if (!args[0]) {
    return console.error("instance [on] or [off]");
  }
  if (args[0]==='on') {
    exports.character.setSoloInstance(true);
  } else if (args[0]==='off') {
    exports.character.setSoloInstance(false);
  }
});