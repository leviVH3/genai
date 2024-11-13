// src/ui/renderer.js
document.addEventListener('DOMContentLoaded', () => {
  // Text Elements
  const textMessages = document.getElementById('text-messages');
  const textInput = document.getElementById('text-input');
  const textButton = document.getElementById('text-button');

  // Image Elements
  const imageMessages = document.getElementById('image-messages');
  const imageInput = document.getElementById('image-input');
  const imageButton = document.getElementById('image-button');

  async function sendTextMessage() {
      const message = textInput.value.trim();
      if (!message) return;

      appendMessage(textMessages, 'user', message);
      textInput.value = '';

      try {
          const response = await window.api.sendMessage(message);
          appendMessage(textMessages, 'assistant', response);
      } catch (error) {
          appendMessage(textMessages, 'error', 'Fehler bei der Textgenerierung.');
      }
  }

  async function generateImage() {
      const prompt = imageInput.value.trim();
      if (!prompt) return;

      appendMessage(imageMessages, 'user', prompt);
      imageInput.value = '';

      try {
          const imageUrl = await window.api.generateImage(prompt);
          const imgContainer = document.createElement('div');
          imgContainer.className = 'message assistant';
          const img = document.createElement('img');
          img.src = imageUrl;
          imgContainer.appendChild(img);
          imageMessages.appendChild(imgContainer);
      } catch (error) {
          appendMessage(imageMessages, 'error', 'Fehler bei der Bildgenerierung.');
      }
  }

  function appendMessage(container, role, content) {
      const messageElement = document.createElement('div');
      messageElement.className = `message ${role}`;
      messageElement.textContent = content;
      container.appendChild(messageElement);
      container.scrollTop = container.scrollHeight;
  }

  // Event Listeners
  textButton.addEventListener('click', sendTextMessage);
  imageButton.addEventListener('click', generateImage);

  textInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendTextMessage();
      }
  });

  imageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          generateImage();
      }
  });
});
// src/ui/renderer.js ergänzen
document.addEventListener('DOMContentLoaded', () => {
    // ... bestehender Code ...

    // Prompt-Hilfe Funktionalität
    const textHelpBtn = document.getElementById('show-text-help');
    const imageHelpBtn = document.getElementById('show-image-help');
    const textHelpModal = document.getElementById('text-help-modal');
    const imageHelpModal = document.getElementById('image-help-modal');

    textHelpBtn.addEventListener('click', () => {
        textHelpModal.classList.toggle('show');
        imageHelpModal.classList.remove('show');
    });

    imageHelpBtn.addEventListener('click', () => {
        imageHelpModal.classList.toggle('show');
        textHelpModal.classList.remove('show');
    });

    // Klick außerhalb schließt Modal
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.prompt-help')) {
            textHelpModal.classList.remove('show');
            imageHelpModal.classList.remove('show');
        }
    });
});