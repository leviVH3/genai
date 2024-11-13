// In src/preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  sendMessage: async (message) => {
    console.log('preload: Sende Nachricht'); // Debug-Log
    const response = await ipcRenderer.invoke('send-message', message);
    console.log('preload: Antwort erhalten'); // Debug-Log
    return response;
  }
});