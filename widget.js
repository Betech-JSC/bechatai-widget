// widget.js
(function() {
  // Tạo object BEChatAI trên window
  window.BEChatAI = {
    init: function({ widgetId, apiUrl }) {
      console.log('Widget initialized');
      console.log('Widget ID:', widgetId);
      console.log('API URL:', apiUrl);

      // Ví dụ: tạo button chat
      const btn = document.createElement('button');
      btn.textContent = 'Chat with AI';
      btn.style.position = 'fixed';
      btn.style.bottom = '20px';
      btn.style.right = '20px';
      btn.style.padding = '10px 20px';
      btn.style.background = '#0070f3';
      btn.style.color = '#fff';
      btn.style.border = 'none';
      btn.style.borderRadius = '5px';
      btn.style.cursor = 'pointer';
      
      // Click button có thể mở popup, gọi API, v.v.
      btn.onclick = () => alert(`Widget ${widgetId} connected to API: ${apiUrl}`);

      document.body.appendChild(btn);
    }
  };
})();
