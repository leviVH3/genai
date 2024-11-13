// In src/preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  sendMessage: async (message) => {
    console.log('preload: Sende Nachricht'); // Debug-Log
    const response = await ipcRenderer.invoke('send-message', message);
    console.log('preload: Antwort erhalten'); // Debug-Log
    return response;
  },
  generateImage: async (prompt) => {
    console.log('preload: Sende Bildgenerierungsanfrage'); // Debug-Log
    const response = await ipcRenderer.invoke('generate-image', prompt);
    console.log('preload: Bildgenerierungsantwort erhalten'); // Debug-Log
    return response;
  }
});