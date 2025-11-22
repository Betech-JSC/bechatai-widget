(function() {
  // Tạo global object BEChatAI nếu chưa tồn tại
  window.BEChatAI = window.BEChatAI || {};

  /**
   * Init widget
   * @param {Object} options
   *  - widgetId: ID của widget
   *  - apiUrl: URL API backend
   */
  window.BEChatAI.init = function({ widgetId, apiUrl }) {
    // Lưu config vào BEChatAI
    window.BEChatAI.config = { widgetId, apiUrl };
    // Không tương tác UI, không gọi chat widget gốc
  };
})();
