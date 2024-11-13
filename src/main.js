const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
require('dotenv').config();
const ClaudeAPI = require('./claudeapi');
const ImageAPI = require('./imageapi');
const PromptManager = require('./promptManager'); // Neue Zeile

// Aktualisiere den send-message Handler
ipcMain.handle('send-message', async (event, message) => {
  try {
    const marketingPrompt = PromptManager.getMarketingTextPrompt(message);
    const response = await ClaudeAPI.generateResponse(marketingPrompt);
    return response;
  } catch (error) {
    console.error('Fehler bei der Textgenerierung:', error);
    throw new Error('Textgenerierung fehlgeschlagen: ' + error.message);
  }
});

// Aktualisiere den generate-image Handler
ipcMain.handle('generate-image', async (event, prompt) => {
  try {
    const cleanPrompt = prompt.trim().replace(/[^\w\s]/gi, '');
    if (!cleanPrompt) throw new Error('Leerer Prompt');
    
    const marketingPrompt = PromptManager.getMarketingImagePrompt(cleanPrompt);
    const result = await ImageAPI.generateImage(marketingPrompt);
    return result;
  } catch (error) {
    console.error('Bildgenerierungsfehler:', error);
    return {
      error: true,
      message: 'Bildgenerierung fehlgeschlagen: Bitte verwenden Sie eine andere Beschreibung.'
    };
  }
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });
  mainWindow.loadFile('ui/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});