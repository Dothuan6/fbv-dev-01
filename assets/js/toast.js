/* Toast thông báo dùng chung — nhúng: <script src="assets/js/toast.js">
   Dùng: showToast('Đã lưu thành công')  |  showToast('Lỗi...', 'error') */
(function(){
  // Style tự chèn (không phụ thuộc styles.css)
  var css = document.createElement('style');
  css.textContent =
    '.toast-wrap{position:fixed;left:50%;bottom:32px;transform:translateX(-50%);z-index:200;' +
    'display:flex;flex-direction:column;gap:10px;align-items:center;pointer-events:none}' +
    '.toast{display:flex;align-items:center;gap:10px;max-width:90vw;background:#1C1C1E;color:#fff;' +
    'border-radius:24px;padding:12px 20px;font-size:15px;box-shadow:0 8px 28px rgba(0,0,0,.28);' +
    'opacity:0;transform:translateY(12px);transition:opacity .22s ease,transform .22s ease}' +
    '.toast.show{opacity:1;transform:translateY(0)}' +
    '.toast .ic{width:22px;height:22px;border-radius:50%;background:#34C759;flex:none;' +
    'display:flex;align-items:center;justify-content:center}' +
    '.toast .ic svg{width:14px;height:14px;color:#fff}' +
    '.toast.error .ic{background:#E5484D}';
  document.head.appendChild(css);

  var wrap = document.createElement('div');
  wrap.className = 'toast-wrap';
  document.body.appendChild(wrap);

  var CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-11"/></svg>';
  var CROSS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>';

  window.showToast = function(msg, type){
    var t = document.createElement('div');
    t.className = 'toast' + (type === 'error' ? ' error' : '');
    t.innerHTML = '<span class="ic">' + (type === 'error' ? CROSS : CHECK) + '</span><span></span>';
    t.lastChild.textContent = msg;
    wrap.appendChild(t);
    requestAnimationFrame(function(){ t.classList.add('show'); });
    setTimeout(function(){
      t.classList.remove('show');
      setTimeout(function(){ t.remove(); }, 250);
    }, 2600);
  };
})();
