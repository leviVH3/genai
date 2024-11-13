// src/claudeapi.js
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config(); // Dotenv hier hinzufügen

class ClaudeAPI {
  constructor() {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY ist nicht in der .env Datei definiert');
    }
    
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY // ANTHROPIC_API_KEY statt CLAUDE_API_KEY
    });
  }

  async generateResponse(prompt) {
    try {
      console.log('Sende Anfrage an Claude API...'); // Debug-Log
      const response = await this.client.messages.create({
        model: "claude-3-sonnet-20240229",
        max_tokens: 1024,
        messages: [{ 
          role: "user", 
          content: prompt 
        }]
      });
      return response.content[0].text;
    } catch (error) {
      if (error.message.includes('credit balance')) {
        console.error('API-Guthaben aufgebraucht. Bitte laden Sie Ihr Guthaben auf.');
      }
      throw error;
    }
  }
}

module.exports = new ClaudeAPI();