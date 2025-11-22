(function() {
  window.BEChatAI = {
    init: function({ widgetId, apiUrl }) {

      // -------------------
      // 1. Thêm style nhúng trực tiếp
      // -------------------
      const style = document.createElement('style');
      style.textContent = `
        .bechatai-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #0070f3;
          color: #fff;
          border: none;
          border-radius: 50px;
          padding: 12px 18px;
          cursor: pointer;
          font-size: 16px;
          z-index: 9999;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
        .bechatai-chatbox {
          position: fixed;
          bottom: 80px;
          right: 20px;
          width: 350px;
          height: 450px;
          background: #fff;
          border-radius: 10px;
          border: 1px solid #ccc;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          display: none;
          flex-direction: column;
          z-index: 9999;
          font-family: Arial, sans-serif;
        }
        .bechatai-chat-header {
          padding: 10px;
          background: #0070f3;
          color: #fff;
          font-weight: bold;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }
        .bechatai-chat-body {
          flex: 1;
          padding: 10px;
          overflow-y: auto;
        }
        .bechatai-chat-input {
          display: flex;
          border-top: 1px solid #ccc;
        }
        .bechatai-chat-input input {
          flex: 1;
          padding: 8px;
          border: none;
          border-radius: 0;
          outline: none;
        }
        .bechatai-chat-input button {
          padding: 8px 12px;
          border: none;
          background: #0070f3;
          color: #fff;
          cursor: pointer;
        }
      `;
      document.head.appendChild(style);

      // -------------------
      // 2. Tạo button mở chatbox
      // -------------------
      const btn = document.createElement('button');
      btn.className = 'bechatai-button';
      btn.textContent = 'Chat with AI';
      document.body.appendChild(btn);

      // -------------------
      // 3. Tạo chatbox
      // -------------------
      const chatBox = document.createElement('div');
      chatBox.className = 'bechatai-chatbox';

      chatBox.innerHTML = `
        <div class="bechatai-chat-header">BE ChatAI</div>
        <div class="bechatai-chat-body"></div>
        <div class="bechatai-chat-input">
          <input type="text" placeholder="Type a message..." />
          <button>Send</button>
        </div>
      `;
      document.body.appendChild(chatBox);

      const input = chatBox.querySelector('input');
      const sendBtn = chatBox.querySelector('button');
      const body = chatBox.querySelector('.bechatai-chat-body');

      // -------------------
      // 4. Toggle mở/đóng chatbox
      // -------------------
      btn.onclick = () => {
        chatBox.style.display = chatBox.style.display === 'none' ? 'flex' : 'none';
      };

      // -------------------
      // 5. Gửi tin nhắn & gọi API
      // -------------------
      const sendMessage = async () => {
        const msg = input.value.trim();
        if (!msg) return;

        // Hiển thị tin nhắn user
        const p = document.createElement('p');
        p.textContent = `You: ${msg}`;
        body.appendChild(p);
        input.value = '';
        body.scrollTop = body.scrollHeight;

        try {
          const res = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ widgetId, message: msg })
          });

          const data = await res.json();
          const reply = document.createElement('p');
          reply.textContent = `AI: ${data.reply || 'No response'}`;
          body.appendChild(reply);
          body.scrollTop = body.scrollHeight;

        } catch (err) {
          const errMsg = document.createElement('p');
          errMsg.textContent = 'AI: Error connecting to API';
          body.appendChild(errMsg);
          body.scrollTop = body.scrollHeight;
          console.error(err);
        }
      };

      sendBtn.onclick = sendMessage;
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
      });
    }
  };
})();
