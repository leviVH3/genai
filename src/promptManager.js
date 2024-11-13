// src/promptManager.js
class PromptManager {
    static getMarketingTextPrompt(userInput) {
      return `Als Marketing-Experte, erstelle: ${userInput}
      
      Beachte dabei:
      - Zielgruppengerechte Sprache
      - Call-to-Action Elemente
      - SEO-optimierte Formulierungen
      - Emotionale Trigger
      - Unique Selling Propositions`;
    }
  
    static getMarketingImagePrompt(userInput) {
      return `Erstelle ein Marketing-optimiertes Bild: ${userInput}
      
      Berücksichtige:
      - Branding-Elemente
      - Zielgruppenansprache
      - Visuelle Hierarchie
      - Emotionale Wirkung
      - Corporate Design Richtlinien`;
    }
  }
  
  module.exports = PromptManager;