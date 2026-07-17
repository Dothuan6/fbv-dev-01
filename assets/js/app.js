// Desktop dùng shell 3 cột; màn hẹp chuyển sang bản mobile hiện có
function goMobileIfNarrow(){ if(window.innerWidth < 1024) location.replace('messages.html'); }
goMobileIfNarrow();
window.addEventListener('resize', goMobileIfNarrow);

var COLORS = {rn:'linear-gradient(135deg,#F5C543,#9B6BF0)', leaf:'linear-gradient(135deg,#1FB6D6,#1877F2)', dark:'linear-gradient(135deg,#3A1C5A,#7B2FF7)', land:'linear-gradient(135deg,#4FA8F5,#16A085)', gray:'#5B6470'};
var convs = [
  {id:'g1', name:'rtetetet, account001, Chang...', av:'RN', color:COLORS.rn, isGroup:true, preview:'rtetetet đã thêm account001...', time:'15:55', st:'85 thành viên',
    members:[{n:'Thành Nhân',r:'Trưởng nhóm',c:COLORS.dark,av:'TN'},{n:'Bình An',c:COLORS.leaf,av:'BA'},{n:'Bình LV',c:COLORS.land,av:'BL'},{n:'Cảnh Nguyễn',c:COLORS.rn,av:'CN'},{n:'Cao Tân',c:COLORS.gray,av:'CT'}],
    msgs:[{text:'Phím để sau này solo'},{text:'Và đánh các kiểu đệm phức tạp'},{me:true,text:'Ko nhu cầu cao tập tay thôi cũng dc',t:'21:45'}]},
  {id:'c1', name:'Change name55', av:'', color:COLORS.leaf, icon:'leaf', preview:'Bạn: hi', time:'11:16', st:'Truy cập 5 phút trước', msgs:[{text:'99jjjjj',t:'11:11'},{me:true,text:'hi',t:'11:16'}]},
  {id:'a1', name:'account001', av:'200', color:COLORS.dark, preview:'Bạn: Gọi video', time:'10:42', st:'Ngoại tuyến', msgs:[{me:true,text:'Hi',t:'16:38'},{me:true,text:'Tôi yêu Việt Nam',t:'11:53'}]},
  {id:'t1', name:'Thuận Đỗ', av:'T', color:COLORS.gray, preview:'Bạn: Hi', time:'21:55', st:'Ngoại tuyến', msgs:[{me:true,text:'Hi',t:'21:55'}]},
  {id:'h1', name:'[2.HOÀNG TÚ]', av:'', color:COLORS.land, icon:'land', isGroup:true, preview:'', time:'', st:'Nhóm',
    members:[{n:'Hoàng Tú',r:'Trưởng nhóm',c:COLORS.land,av:'HT'},{n:'Bạn',r:'',c:COLORS.gray,av:'R'}], msgs:[]},
  {id:'p1', name:'+84966613625', av:'+', color:COLORS.leaf, preview:'', time:'', st:'Chưa kết bạn', msgs:[]}
];
var active = null;
var list = document.getElementById('convList');

function avatarHTML(c, cls){
  var inner = c.icon==='leaf' ? '<svg viewBox="0 0 24 24" fill="#fff"><path d="M12 3c5 1 7 5 6 11-4 1-8-1-9-5 2 1 4 1 5 0-2-1-3-3-2-6z"/></svg>'
    : c.icon==='land' ? '<svg viewBox="0 0 24 24" fill="#fff" opacity=".9"><path d="M4 18l4-5 3 3 4-6 5 8z"/><circle cx="8" cy="8" r="2"/></svg>'
    : c.av;
  return '<div class="'+cls+'" style="background:'+c.color+'">'+inner+'</div>';
}

convs.forEach(function(c){
  var el = document.createElement('div');
  el.className = 'conv'; el.dataset.id = c.id;
  el.innerHTML = avatarHTML(c,'av') +
    '<div class="mid"><div class="nm">'+c.name+'</div>'+(c.preview?'<div class="pv">'+c.preview+'</div>':'')+'</div>'+
    (c.time?'<div class="tm">'+c.time+'</div>':'');
  el.onclick = function(){ openConv(c.id); };
  list.appendChild(el);
});

function openConv(id){
  active = convs.find(function(c){ return c.id===id; });
  document.querySelectorAll('.conv').forEach(function(e){ e.classList.toggle('active', e.dataset.id===id); });
  // header + info
  document.getElementById('hAv').outerHTML = avatarHTML(active,'av').replace('class="av"','class="av" id="hAv"');
  if(!active.isGroup){ var hav=document.getElementById('hAv'); hav.style.cursor='pointer'; hav.onclick=function(){ openFriendModal && openFriendModal({name:active.name, av:active.av||active.name[0], color:active.color}); }; }
  document.getElementById('hNm').textContent = active.name;
  document.getElementById('hSt').textContent = active.st;
  document.getElementById('iAv').outerHTML = avatarHTML(active,'av').replace('class="av"','class="av" id="iAv"');
  document.getElementById('iNm').textContent = active.name;
  // Nhóm → "Thêm thành viên"; 1-1 → "Tạo nhóm"
  document.getElementById('qGroupLabel').textContent = active.isGroup ? 'Thêm thành viên' : 'Tạo nhóm';
  document.getElementById('icHead').textContent = active.isGroup ? 'Thông tin nhóm' : 'Thông tin hội thoại';
  renderMembers();
  closeConvSearch();            // về lại view thông tin khi đổi hội thoại
  if(typeof cancelReply==='function') cancelReply();
  renderMsgs();
}

function escapeHtml(s){ return s.replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
function escapeRe(s){ return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }

var ICON = {
  emoji:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="9" cy="10" r="1"/><circle cx="15" cy="10" r="1"/><path d="M8.5 14.5a4 4 0 007 0" stroke-linecap="round"/></svg>',
  reply:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 17l-5-5 5-5"/><path d="M4 12h11a5 5 0 015 5v1"/></svg>',
  forward:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 17l5-5-5-5"/><path d="M20 12H9a5 5 0 00-5 5v1"/></svg>',
  more:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>'
};

// ----- Thành viên nhóm -----
function renderMembers(){
  var sec = document.getElementById('membersSec');
  if(!active.isGroup || !active.members){ sec.style.display='none'; return; }
  sec.style.display='';
  document.getElementById('membersTitle').textContent = 'Thành viên nhóm (' + active.members.length + ')';
  var box = document.getElementById('memberList'); box.innerHTML='';
  active.members.forEach(function(mem){
    var el = document.createElement('div'); el.className='mem';
    el.innerHTML = '<div class="a" style="background:'+mem.c+'">'+mem.av+'</div>'+
      '<div class="nm">'+mem.n+(mem.r?'<div class="role">'+mem.r+'</div>':'')+'</div>'+
      (mem.n==='Bạn'?'':'<button class="add" onclick="location.href=\'add-friend.html\'">Kết bạn</button>');
    box.appendChild(el);
  });
}

// ----- Tin nhắn + menu hover -----
function renderMsgs(){
  var b = document.getElementById('mcBody');
  b.innerHTML = '<div class="day">Hôm nay</div>';
  active.msgs.forEach(function(m){
    var row = document.createElement('div');
    row.className = 'row' + (m.me?' me':'') + (m.rct?' has-rct':'');
    if(!m.me) row.innerHTML = avatarHTML(active,'ra');
    var msg = document.createElement('div'); msg.className='msg';
    var quoteHTML = m.quote ? '<div class="q"><div class="qn">'+escapeHtml(m.quote.name)+'</div><div class="qt">'+escapeHtml(m.quote.text)+'</div></div>' : '';
    msg.innerHTML = quoteHTML + '<span class="mt">'+escapeHtml(m.text)+'</span>' + (m.t?'<span class="t">'+m.t+'</span>':'');
    if(m.rct){ var r=document.createElement('span'); r.className='rct'; r.textContent=m.rct+' 1'; r.onclick=function(e){ e.stopPropagation(); openReactions(m); }; msg.appendChild(r); }
    attachActions(msg, m, {msg:m, list:active.msgs, render:renderMsgs}, replyMsg);
    row.appendChild(msg);
    b.appendChild(row);
  });
  b.scrollTop = b.scrollHeight;
}

// ----- Popover (picker / menu) — dùng chung qua ngữ cảnh _ctx -----
var _ctx = null;   // {msg, list, render}
function openPop(kind, btn, ctx){
  _ctx = ctx;
  var el = document.getElementById(kind==='picker'?'picker':'msgMenu');
  document.getElementById('picker').classList.remove('show');
  document.getElementById('msgMenu').classList.remove('show');
  el.classList.add('show');
  var r = btn.getBoundingClientRect(), w = el.offsetWidth, h = el.offsetHeight;
  var left = Math.min(r.left, window.innerWidth - w - 8);
  var top = r.top - h - 6; if(top < 8) top = r.bottom + 6;
  el.style.left = Math.max(8,left)+'px'; el.style.top = top+'px';
}
function closePops(){ document.getElementById('picker').classList.remove('show'); document.getElementById('msgMenu').classList.remove('show'); }
function react(emoji){ if(_ctx){ _ctx.msg.rct = emoji; _ctx.render(); } closePops(); }

// Gắn thanh hành động (cảm xúc/trả lời/chuyển tiếp/thêm) cho 1 tin nhắn
function attachActions(el, m, ctx, onReply){
  var acts = document.createElement('div'); acts.className='msg-acts';
  acts.innerHTML = '<button title="Cảm xúc">'+ICON.emoji+'</button><button title="Trả lời">'+ICON.reply+'</button><button title="Chuyển tiếp">'+ICON.forward+'</button><button title="Thêm">'+ICON.more+'</button>';
  var bt = acts.querySelectorAll('button');
  bt[0].onclick=function(e){ openPop('picker', e.currentTarget, ctx); };
  bt[1].onclick=function(){ onReply(m); };
  bt[2].onclick=function(){ openForward(m); };
  bt[3].onclick=function(e){ openPop('menu', e.currentTarget, ctx); };
  el.appendChild(acts);
}

var replyState = null;
function replyMsg(m){
  replyState = m;
  document.getElementById('rbName').textContent = m.me ? '· Bạn' : '· ' + active.name;
  document.getElementById('rbText').textContent = m.text;
  document.getElementById('mcReply').classList.add('show');
  document.getElementById('mcInput').focus();
  closePops();
}
function cancelReply(){ replyState = null; document.getElementById('mcReply').classList.remove('show'); }
function msgAct(act){
  if(!_ctx) return; var m=_ctx.msg;
  if(act==='copy'){ navigator.clipboard && navigator.clipboard.writeText(m.text); }
  else if(act==='thread'){ openThread(m); }
  else if(act==='recall' || act==='delete'){ var i=_ctx.list.indexOf(m); if(i>-1){ _ctx.list.splice(i,1); _ctx.render(); } }
  closePops();
}

// ----- Chủ đề (trả lời trong chuỗi) -----
var _thm = null;
function openThread(m){
  _thm = m; if(!m.thread) m.thread = [];
  document.getElementById('tpFrom').textContent = 'Từ: ' + (m.me ? 'Bạn' : active.name);
  renderThread();
  document.getElementById('threadPanel').classList.add('show');
}
function renderThread(){
  var b = document.getElementById('tpBody'); b.innerHTML = '';
  var root = document.createElement('div'); root.className='tp-root';
  root.innerHTML = '<div class="rn">'+(_thm.me?'Bạn':active.name)+'</div><div class="rt">'+escapeHtml(_thm.text)+'</div>'+(_thm.t?'<div class="rtm">'+_thm.t+'</div>':'');
  b.appendChild(root);
  var div = document.createElement('div'); div.className='tp-div'; div.textContent = _thm.thread.length + ' phản hồi trong chủ đề'; b.appendChild(div);
  _thm.thread.forEach(function(r){
    var el=document.createElement('div'); el.className='tp-reply'+(r.rct?' has-rct':'');
    el.innerHTML='<span class="mt">'+escapeHtml(r.text)+'</span><span class="t">'+r.t+'</span>';
    if(r.rct){ var p=document.createElement('span'); p.className='rct'; p.textContent=r.rct+' 1'; p.onclick=function(e){ e.stopPropagation(); openReactions(r); }; el.appendChild(p); }
    attachActions(el, r, {msg:r, list:_thm.thread, render:renderThread}, function(m){ var i=document.getElementById('tpInput'); i.value='↩ '+m.text+' '; i.focus(); });
    b.appendChild(el);
  });
  b.scrollTop = b.scrollHeight;
}
function sendThread(){
  var i = document.getElementById('tpInput'); if(!_thm || !i.value.trim()) return;
  _thm.thread.push({text:i.value.trim(), t:nowHH()}); i.value=''; renderThread();
}
function closeThread(){ document.getElementById('threadPanel').classList.remove('show'); }
document.getElementById('tpInput').addEventListener('keydown', function(e){ if(e.key==='Enter') sendThread(); });
document.addEventListener('click', function(e){
  if(!e.target.closest('.msg-acts') && !e.target.closest('.pop')) closePops();
});

// ----- Tìm kiếm trong trò chuyện -----
function openConvSearch(){
  document.getElementById('infoCol').classList.add('show');
  document.getElementById('infoToggle').classList.add('active');
  document.getElementById('infoView').style.display='none';
  document.getElementById('searchView').classList.add('show');
  document.getElementById('convSearch').focus();
}
function closeConvSearch(){
  document.getElementById('searchView').classList.remove('show');
  document.getElementById('infoView').style.display='';
  var s=document.getElementById('convSearch'); if(s) s.value='';
  document.getElementById('svCount').textContent='';
  clearHighlight();
}
function clearHighlight(){ document.querySelectorAll('#mcBody .mt').forEach(function(el){ if(el.dataset.raw!=null){ el.textContent=el.dataset.raw; } }); }
function doConvSearch(){
  var term=document.getElementById('convSearch').value.trim(), count=0;
  document.querySelectorAll('#mcBody .mt').forEach(function(el){
    var raw = el.dataset.raw!=null ? el.dataset.raw : el.textContent; el.dataset.raw = raw;
    if(term){ var re=new RegExp('('+escapeRe(term)+')','gi'); var m=raw.match(re);
      if(m){ el.innerHTML=raw.replace(re,'<mark>$1</mark>'); count+=m.length; } else el.textContent=raw; }
    else el.textContent=raw;
  });
  document.getElementById('svCount').textContent = term ? (count+' kết quả') : '';
}

function sendMsg(){
  var i = document.getElementById('mcInput');
  if(!active || !i.value.trim()) return;
  var t = new Date(), hh = String(t.getHours()).padStart(2,'0')+':'+String(t.getMinutes()).padStart(2,'0');
  var msg = {me:true, text:i.value.trim(), t:hh};
  if(replyState){ msg.quote = {name: replyState.me ? 'Bạn' : active.name, text: replyState.text}; cancelReply(); }
  active.msgs.push(msg);
  i.value=''; renderMsgs();
}
document.getElementById('mcInput').addEventListener('keydown', function(e){ if(e.key==='Enter') sendMsg(); });

function toggleInfo(){
  document.getElementById('infoCol').classList.toggle('show');
  document.getElementById('infoToggle').classList.toggle('active');
}
// ----- Modal Chia sẻ (chuyển tiếp) -----
var _fwd = null;
function nowHH(){ var t=new Date(); return String(t.getHours()).padStart(2,'0')+':'+String(t.getMinutes()).padStart(2,'0'); }
function openForward(m){
  _fwd = m; closePops();
  document.getElementById('fwPreview').textContent = m.text;
  renderFwList(''); document.getElementById('fwOk').disabled = true;
  document.getElementById('fwOverlay').classList.add('show');
}
function renderFwList(filter){
  var box=document.getElementById('fwList'); box.innerHTML='';
  convs.filter(function(c){ return !filter || c.name.toLowerCase().indexOf(filter.toLowerCase())>-1; }).forEach(function(c){
    var el=document.createElement('label'); el.className='fw-item';
    el.innerHTML='<input type="checkbox" value="'+c.id+'" onchange="fwUpdate()">'+avatarHTML(c,'av')+'<span class="nm">'+c.name+'</span>';
    box.appendChild(el);
  });
}
function fwFilter(v){ renderFwList(v); fwUpdate(); }
function fwUpdate(){ document.getElementById('fwOk').disabled = document.querySelectorAll('#fwList input:checked').length===0; }
function closeForward(){ document.getElementById('fwOverlay').classList.remove('show'); _fwd=null; }
function doForward(){
  var checked=document.querySelectorAll('#fwList input:checked'), reRender=false;
  checked.forEach(function(ch){ var c=convs.find(function(x){return x.id===ch.value;}); if(c){ c.msgs.push({me:true,text:_fwd.text,t:nowHH()}); if(active&&c.id===active.id) reRender=true; } });
  if(reRender) renderMsgs();
  closeForward();
}

// ----- Modal Biểu cảm -----
function openReactions(m){
  if(!m.rct) return;
  var reactor = {name:'Bạn', av:'B', c:COLORS.dark, emoji:m.rct};   // người đã thả (demo)
  document.getElementById('rxTabs').innerHTML =
    '<div class="rx-tab active"><span>Tất cả</span><span>1</span></div>'+
    '<div class="rx-tab"><span>'+m.rct+'</span><span>1</span></div>';
  document.getElementById('rxPeople').innerHTML =
    '<div class="rx-person"><div class="av" style="background:'+reactor.c+'">'+reactor.av+'</div>'+
    '<span class="nm">'+reactor.name+'</span><span class="emo">'+reactor.emoji+' 1</span></div>';
  document.getElementById('rxOverlay').classList.add('show');
}
function closeReactions(){ document.getElementById('rxOverlay').classList.remove('show'); }
document.getElementById('rxOverlay').addEventListener('click', function(e){ if(e.target===this) closeReactions(); });

openConv('a1');  // mở sẵn hội thoại đầu
