// src/ui/renderer.js
document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
  
    async function sendMessage() {
      const message = userInput.value.trim();
      if (!message) return;
  
      // Benutzer-Nachricht anzeigen
      appendMessage('user', message);
      userInput.value = '';
  
      try {
        // API-Antwort abrufen
        const response = await window.api.sendMessage(message);
        appendMessage('assistant', response);
      } catch (error) {
        appendMessage('error', 'Ein Fehler ist aufgetreten.');
      }
    }
  
    function appendMessage(role, content) {
      const messageDiv = document.createElement('div');
      messageDiv.className = `message ${role}`;
      messageDiv.textContent = content;
      chatMessages.appendChild(messageDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  });
  // In renderer.js
async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  console.log('Sende Nachricht:', message); // Debug-Log

  appendMessage('user', message);
  userInput.value = '';

  try {
    console.log('Warte auf API-Antwort...'); // Debug-Log
    const response = await window.api.sendMessage(message);
    console.log('API-Antwort erhalten:', response); // Debug-Log
    appendMessage('assistant', response);
  } catch (error) {
    console.error('Fehler:', error); // Debug-Log
    appendMessage('error', 'Ein Fehler ist aufgetreten.');
  }
}