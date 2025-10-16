Hooks.on('ready', async function () {
    const MODULE_ID = 'la-taberna-de-berna-pf2';
    const customPauseLogo = `modules/${MODULE_ID}/Art/logo.png`;
  
    // Función para reemplazar el logo de pausa
    function replacePauseLogo() {
      const pauseImg = document.querySelector('.pause img, .fa-spin'); // Ajusta si es necesario
      if (pauseImg) {
        pauseImg.src = customPauseLogo;
        console.log('Logo de pausa reemplazado con éxito:', pauseImg.src);
      } else {
        console.warn('No se encontró el elemento del logo de pausa.');
      }
    }
  
    // Observador de mutaciones para actualizar el logo si otro módulo lo modifica
    const observer = new MutationObserver(() => {
      replacePauseLogo();
    });
  
    // Configurar el observador para monitorear cambios en el body
    observer.observe(document.body, { childList: true, subtree: true });
  
    // Hook para actualizar el logo cada vez que se pausa/despausa el juego
    Hooks.on('pauseGame', () => {
      console.log('El juego ha sido pausado. Actualizando el logo...');
      replacePauseLogo();
    });
  
    // Hook para quitar la pausa
    Hooks.on('unpauseGame', () => {
      console.log('El juego ha sido despausado. Verificando el logo...');
      replacePauseLogo();
    });
  
    // Reemplazar el logo al cargar el script
    replacePauseLogo();
  });