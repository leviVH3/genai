// src/imageapi.js
const OpenAI = require('openai');
require('dotenv').config();

class ImageAPI {
  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY nicht gefunden');
    }
    
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  async generateImage(prompt) {
    try {
      console.log('Starte sichere Bildgenerierung...');
      
      // Sicherere Prompt-Formulierung
      const safePrompt = `Ein freundliches Bild von: ${prompt}`;
      
      const response = await this.client.images.generate({
        model: "dall-e-3",
        prompt: safePrompt,
        size: "1024x1024",
        quality: "standard",
        n: 1,
      });

      return response.data[0].url;
    } catch (error) {
      console.error('Bildgenerierungsfehler:', error);
      throw new Error('Bildgenerierung fehlgeschlagen - bitte anderen Prompt verwenden');
    }
  }
}

module.exports = new ImageAPI();