// main.js - Ergänze am Anfang
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
require('dotenv').config();

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    icon: path.join(__dirname, 'assets', 'logo.ico'), // Setzt das Icon für das Fenster
    autoHideMenuBar: true, // Versteckt die Menüleiste
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'ui', 'index.html'));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
// In src/main.js nach createWindow()
const ClaudeAPI = require('./claudeapi');

ipcMain.handle('send-message', async (event, message) => {
  try {
    return await ClaudeAPI.generateResponse(message);
  } catch (error) {
    console.error(error);
    return 'Ein Fehler ist aufgetreten.';
  }
});