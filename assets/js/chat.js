var body = document.getElementById('chatBody');
var overlay = document.getElementById('ctxOverlay');
var group = document.getElementById('ctxGroup');
var target = null;
var replyState = null;   // {name, text} khi đang trả lời
var reactedBubble = null;

// Gửi tin nhắn
var input = document.getElementById('msgInput');
input.addEventListener('keydown', function(e){
  if(e.key === 'Enter' && this.value.trim()){
    var t = new Date();
    var hh = String(t.getHours()).padStart(2,'0') + ':' + String(t.getMinutes()).padStart(2,'0');
    var b = document.createElement('div');
    b.className = 'bubble sent';
    if(replyState){
      var q = document.createElement('div'); q.className = 'quote';
      var qn = document.createElement('div'); qn.className = 'q-name'; qn.textContent = 'Trả lời: ' + replyState.name;
      var qt = document.createElement('div'); qt.className = 'q-text'; qt.textContent = replyState.text;
      q.appendChild(qn); q.appendChild(qt); b.appendChild(q);
    }
    var msg = document.createElement('span'); msg.className = 'msg-text'; msg.textContent = this.value.trim();
    var time = document.createElement('span'); time.className = 'time'; time.textContent = hh;
    b.appendChild(msg); b.appendChild(time);
    addDotBtn(b);
    bindCtx(b);
    body.appendChild(b);
    body.scrollTop = body.scrollHeight;
    this.value = '';
    cancelReply();
  }
});

// Tên người gửi của 1 bóng chat
function senderName(b){
  if(b.classList.contains('sent')) return 'bạn';
  var nm = document.querySelector('.chat-header .nm');
  return nm ? nm.textContent.trim() : 'Người dùng';
}

// Bật chế độ trả lời
function setReply(b){
  replyState = { name: senderName(b), text: getText(b) };
  document.getElementById('rbName').textContent = 'Trả lời: ' + replyState.name;
  document.getElementById('rbText').textContent = replyState.text;
  document.querySelector('.chat-screen').classList.add('replying');
  input.focus();
}
function cancelReply(){
  replyState = null;
  document.querySelector('.chat-screen').classList.remove('replying');
}

// Thêm nút 3 chấm vào bubble
function addDotBtn(bubble){
  var btn = document.createElement('button');
  btn.className = 'dot-btn'; btn.setAttribute('aria-label','Tùy chọn');
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>';
  btn.addEventListener('click', function(e){ e.stopPropagation(); openCtx(bubble); });
  bubble.appendChild(btn);
}

// Chuột phải / nhấn giữ
function bindCtx(bubble){
  bubble.addEventListener('contextmenu', function(e){ e.preventDefault(); openCtx(bubble); });
  var timer;
  bubble.addEventListener('touchstart', function(){ timer = setTimeout(function(){ openCtx(bubble); }, 500); });
  bubble.addEventListener('touchend', function(){ clearTimeout(timer); });
  bubble.addEventListener('touchmove', function(){ clearTimeout(timer); });
}

// Mở menu, neo theo vị trí bubble
function openCtx(bubble){
  if(target) target.classList.remove('selected');
  target = bubble; target.classList.add('selected');
  overlay.classList.add('show');
  group.classList.add('show');

  var r = bubble.getBoundingClientRect();
  var gw = group.offsetWidth, gh = group.offsetHeight;
  var left = bubble.classList.contains('sent') ? r.right - gw : r.left;   // canh theo phía bubble
  left = Math.max(8, Math.min(left, window.innerWidth - gw - 8));
  var top = r.bottom + 10;
  if(top + gh > window.innerHeight - 8) top = Math.max(8, r.top - gh - 10); // không đủ chỗ → hiện phía trên
  group.style.left = left + 'px';
  group.style.top = top + 'px';
}

function closeCtx(){
  overlay.classList.remove('show');
  group.classList.remove('show');
  if(target){ target.classList.remove('selected'); target = null; }
}

function react(emoji){
  if(!target) return;
  var foot = target.querySelector('.foot');
  if(!foot){
    foot = document.createElement('div'); foot.className = 'foot';
    var time = target.querySelector('.time');
    if(time) foot.appendChild(time);     // gom giờ vào hàng footer
    target.appendChild(foot);
  }
  var old = foot.querySelector('.reaction'); if(old) old.remove();
  var r = document.createElement('span'); r.className = 'reaction'; r.textContent = emoji + ' 1';
  bindReaction(r, target);
  foot.appendChild(r);
  closeCtx();
}

// Nhấn vào pill cảm xúc → mở bottom sheet
function bindReaction(pill, bubble){
  pill.addEventListener('click', function(e){ e.stopPropagation(); openReactionSheet(bubble); });
}
function openReactionSheet(bubble){
  var pill = bubble.querySelector('.reaction'); if(!pill) return;
  reactedBubble = bubble;
  var emoji = pill.textContent.trim().split(' ')[0];
  document.getElementById('sheetSummary').textContent = pill.textContent;
  document.getElementById('reactorEmo').textContent = emoji;
  document.getElementById('sheetOverlay').classList.add('show');
  document.getElementById('reactSheet').classList.add('show');
}
function closeSheet(){
  document.getElementById('sheetOverlay').classList.remove('show');
  document.getElementById('reactSheet').classList.remove('show');
}
function removeReaction(){
  if(reactedBubble){
    var p = reactedBubble.querySelector('.reaction'); if(p) p.remove();
    reactedBubble = null;
  }
  closeSheet();
}

function getText(b){ var m = b && b.querySelector('.msg-text'); return m ? m.textContent : ''; }

function ctxAction(act){
  if(!target) return;
  var text = getText(target);
  if(act === 'copy'){ navigator.clipboard && navigator.clipboard.writeText(text); }
  else if(act === 'deleteAll' || act === 'deleteMe'){ target.remove(); target = null; }
  else if(act === 'thread'){ window.location.href = 'thread.html'; return; }
  else if(act === 'reply'){ setReply(target); }
  else if(act === 'forward'){ alert('Chuyển tiếp: "' + text + '"'); }
  closeCtx();
}

// Khởi tạo cho bubble có sẵn
document.querySelectorAll('.bubble').forEach(function(b){ addDotBtn(b); bindCtx(b); });
window.addEventListener('resize', closeCtx);

// Bắt đầu cuộc gọi (voice/video) với tên ở header
function startCall(kind){
  var nm = document.querySelector('.chat-header .nm');
  var name = nm ? encodeURIComponent(nm.textContent.trim()) : '';
  window.location.href = 'call.html?type=' + kind + '&name=' + name;
}
