Hooks.once('ready', async function() {
  console.log('La Taberna de Berna (PF2) | Initializing');

  // Create folders if module is active
  if (game.settings.get('la-taberna-de-berna-pf2', 'moduleActive')) {
    createCompendiumFolders();
  }
});

// Function to create compendium folders
async function createCompendiumFolders() {
  const folderName = "La Taberna de Berna";
  let folder = game.folders.contents.find(f => f.name === folderName && f.type === "Compendium");
  if (!folder) {
    folder = await Folder.create({
      name: folderName,
      type: "Compendium",
      sorting: "m",
      color: "#5c0000ff"
    });
  }

  // Move packs into the folder
  const packsToMove = [
    "la-taberna-de-berna-pf2.aventuras",
    "la-taberna-de-berna-pf2.objetos"
  ];

  for (const packId of packsToMove) {
    let pack = game.packs.get(packId);
    if (pack) {
      await pack.configure({ folder: folder.id });
    }
  }
}

// Hook into module enable/disable
Hooks.on('controlToken', () => {
  let activeModules = game.modules.filter(m => m.active).map(m => m.id);
  game.settings.set('la-taberna-de-berna-pf2', 'moduleActive', activeModules.includes('la-taberna-de-berna-pf2'));
});
