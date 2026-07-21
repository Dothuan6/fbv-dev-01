if(window.innerWidth < 1024) location.replace('feed.html');
window.addEventListener('resize', function(){ if(window.innerWidth < 1024) location.replace('feed.html'); });

function esc(s){ return s.replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }

var _cid = 1000;
function cmt(n, c, t, ac, replies){
  return {id:++_cid, n:n, av:n[0].toUpperCase(), ac:ac||'#5B6470', c:c, t:t||'1 giờ', likes:0, liked:false, replies:replies||[], showReplies:false, replying:false};
}

var posts = [
  {id:1, author:'rtetetet', av:'R', time:'9 giờ trước', text:'Video tets', media:true, liked:false, likes:3, comments:[
    cmt('Xuân Tiến','Tưởng nghỉ game r','1 giờ','#E0754A'),
    cmt('Đỗ Quyên','Người giàu cũng chơi mấy cái event này nữa à 🤣','3 giờ','#C2436B',[
      cmt('rtetetet','Vui mà bạn 😄','2 giờ','#5B6470'),
      cmt('Đỗ Quyên','Chuẩn luôn','2 giờ','#C2436B')
    ]),
    cmt('Quảng Hảo Hảo','Gặp boss trong đây cứ thấy là t cụng thua cũng dc','48 phút','linear-gradient(135deg,#F5C543,#9B6BF0)'),
    cmt('Lão Nhị','Boss cung bon chen tàu đụng nữa à. 🤣','1 giờ','#3E7C59')
  ]},
  {id:3, author:'account001', av:'200', ac:'linear-gradient(135deg,#3A1C5A,#7B2FF7)', time:'1 ngày trước', text:'', media:true, liked:false, likes:8, comments:[
    cmt('Hà Sam','Ảnh đẹp quá 😍','5 giờ','#3E7C59')
  ]},
  {id:2, author:'account001', av:'200', ac:'linear-gradient(135deg,#3A1C5A,#7B2FF7)', time:'29/04/2026 (đã chỉnh sửa)', text:'Hi, Im Thomas. here my new account', media:false, liked:false, likes:4, comments:[
    cmt('Change name55','Chào bạn 👋','1 ngày','#1FA8A0')
  ]}
];

// Tổng số bình luận (gồm cả phản hồi)
function cmtCount(p){
  return p.comments.reduce(function(s,c){ return s + 1 + (c.replies?c.replies.length:0); }, 0);
}

// ---- Bộ lọc cột trái ----
var ME = 'rtetetet';
var filter = 'all';
var TITLES = {all:'Bản tin', mine:'Bài viết của tôi'};

function setFilter(f, el){
  filter = f;
  document.querySelectorAll('.side-nav .it').forEach(function(n){ n.classList.remove('active'); });
  if(el) el.classList.add('active');
  document.getElementById('feedHead').textContent = TITLES[f];
  // Chỉ hiện ô soạn bài ở Bảng tin
  document.getElementById('composerCard').style.display = (f === 'all') ? '' : 'none';
  document.querySelector('.feed-center').scrollTop = 0;
  render();
}

function visiblePosts(){
  if(filter === 'mine') return posts.filter(function(p){ return p.author === ME; });
  return posts;
}

function render(){
  var box=document.getElementById('postList'); box.innerHTML='';
  var list = visiblePosts();
  if(!list.length){
    box.innerHTML = '<div class="card" style="padding:40px;text-align:center;color:var(--text-secondary)">Chưa có bài viết</div>';
    return;
  }
  list.forEach(function(p){
    var el=document.createElement('div'); el.className='card post'; el.dataset.id=p.id;
    el.innerHTML =
      '<div class="ph"><div class="av" style="background:'+(p.ac||'#5B6470')+'">'+p.av+'</div>'+
        '<div><div class="nm">'+p.author+'</div><div class="meta">'+p.time+'</div></div>'+
        '<div class="more" onclick="openPostMenu(event,'+p.id+')">&#8943;</div></div>'+
      (p.text?'<div class="txt">'+esc(p.text)+'</div>':'')+
      (p.media?'<div class="media"><div class="play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div></div>':'')+
      '<div class="stat"><span>'+p.likes+' lượt thích</span><span class="cmt-link" onclick="openPostModal('+p.id+')">'+cmtCount(p)+' bình luận</span></div>'+
      '<div class="bar"><div class="a '+(p.liked?'liked':'')+'" onclick="toggleLike('+p.id+')"><svg viewBox="0 0 24 24" fill="'+(p.liked?'currentColor':'none')+'" stroke="currentColor" stroke-width="2"><path d="M12 21C5 14.5 3 11 3 8a4.5 4.5 0 018-2.8A4.5 4.5 0 0121 8c0 3-2 6.5-9 13z"/></svg>Thích</div>'+
        '<div class="a" onclick="openPostModal('+p.id+')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.5 8.5 0 01-12.4 7.5L3 21l2-5.6A8.5 8.5 0 1121 11.5z"/></svg>Bình luận</div></div>';
    box.appendChild(el);
  });
}

function getPost(id){ return posts.find(function(x){ return x.id===id; }); }
function toggleLike(id){ var p=getPost(id); p.liked=!p.liked; p.likes+=p.liked?1:-1; render(); if(_openPid===id) renderPostModal(); }

// Menu bài đăng
var _pid=null;
function openPostMenu(e, id){
  e.stopPropagation(); _pid=id;
  var m=document.getElementById('postMenu'); m.classList.add('show');
  var r=e.currentTarget.getBoundingClientRect();
  m.style.left=Math.min(r.left,window.innerWidth-m.offsetWidth-8)+'px'; m.style.top=(r.bottom+6)+'px';
}
function closePop(){ document.getElementById('postMenu').classList.remove('show'); }
function deletePost(){ posts=posts.filter(function(p){return p.id!==_pid;}); render(); closePop(); showToast('Xóa bài đăng thành công'); }
// Menu bài đăng: chỉnh sửa quyền xem / chỉnh sửa bài đăng
function editPostPrivacy(){ closePop(); showToast('Cập nhật quyền riêng tư thành công'); }
function editPost(){ closePop(); showToast('Sửa bài đăng thành công'); }
document.addEventListener('click', function(e){ if(!e.target.closest('.more') && !e.target.closest('#postMenu')) closePop(); });

// Dropdown quyền xem bài đăng
function togglePriv(e){
  e.stopPropagation();
  document.getElementById('privMenu').classList.toggle('show');
}
function closePriv(){ document.getElementById('privMenu').classList.remove('show'); }
function pickPriv(label, el, e){
  e.stopPropagation();
  document.querySelectorAll('#privMenu .pm-it').forEach(function(i){ i.classList.remove('sel'); });
  el.classList.add('sel');
  document.getElementById('privLabel').textContent = label;
  closePriv();
  showToast('Cập nhật quyền riêng tư thành công');
}
document.addEventListener('click', function(e){ if(!e.target.closest('.priv')) closePriv(); });

// Modal soạn bài
function openCompose(){ document.getElementById('composeOverlay').classList.add('show'); document.getElementById('composeText').focus(); }
function closeCompose(){ closePriv(); document.getElementById('composeOverlay').classList.remove('show'); document.getElementById('composeText').value=''; onType(); }
function onType(){ document.getElementById('postBtn').classList.toggle('ready', document.getElementById('composeText').value.trim().length>0); }
function publish(){
  var t=document.getElementById('composeText').value.trim(); if(!t) return;
  posts.unshift({id:Date.now(), author:'rtetetet', av:'R', time:'Vừa xong', text:t, media:false, liked:false, likes:0, comments:[]});
  render(); closeCompose();
}
document.getElementById('composeOverlay').addEventListener('click', function(e){ if(e.target===this) closeCompose(); });

/* ===================== Modal chi tiết bài đăng (kiểu Facebook) ===================== */
var _openPid = null;

var _pd = document.createElement('div');
_pd.className = 'pd-overlay';
_pd.id = 'pdOverlay';
_pd.innerHTML =
  '<div class="pd-modal">'+
    '<div class="pd-head"><h3 id="pdTitle">Bài viết</h3>'+
      '<button class="x" onclick="closePostModal()" aria-label="Đóng">'+
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>'+
      '</button></div>'+
    '<div class="pd-scroll" id="pdScroll"></div>'+
    '<div class="pd-foot">'+
      '<div class="av">R</div>'+
      '<div class="pd-inp"><input id="pdInput" placeholder="Viết bình luận..." onkeydown="if(event.key===\'Enter\')sendComment()">'+
        '<span class="send" onclick="sendComment()"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 20l18-8L3 4l3 8-3 8z"/></svg></span></div>'+
    '</div>'+
  '</div>';
document.body.appendChild(_pd);
_pd.addEventListener('click', function(e){ if(e.target===this) closePostModal(); });
document.addEventListener('keydown', function(e){ if(e.key==='Escape' && _openPid!==null) closePostModal(); });

function cmtHTML(c, pid, isReply){
  var reps = c.replies || [];
  return '<div class="pd-cmt'+(isReply?' rep':'')+'">'+
    '<div class="av" style="background:'+c.ac+'">'+c.av+'</div>'+
    '<div class="mid">'+
      '<div class="bub"><div class="n">'+esc(c.n)+'</div><div class="c">'+esc(c.c)+'</div></div>'+
      '<div class="acts">'+
        '<span class="'+(c.liked?'on':'')+'" onclick="likeComment('+pid+','+c.id+')">Thích</span>'+
        (isReply?'':'<span onclick="replyComment('+pid+','+c.id+')">Trả lời</span>')+
        '<span class="t">'+c.t+'</span>'+
        (c.likes?'<span class="lk">👍 '+c.likes+'</span>':'')+
      '</div>'+
      (reps.length ? '<div class="rep-toggle" onclick="toggleReplies('+pid+','+c.id+')">'+
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" class="'+(c.showReplies?'up':'')+'"><path d="M6 9l6 6 6-6"/></svg>'+
          (c.showReplies ? 'Ẩn phản hồi' : 'Xem '+reps.length+' phản hồi')+'</div>' : '')+
      (c.showReplies ? '<div class="reps">'+reps.map(function(r){ return cmtHTML(r, pid, true); }).join('')+'</div>' : '')+
      (c.replying ? '<div class="pd-repinp"><div class="av">R</div>'+
          '<input id="rep'+c.id+'" placeholder="Trả lời '+esc(c.n)+'..." onkeydown="if(event.key===\'Enter\')sendReply('+pid+','+c.id+')">'+
          '<span class="send" onclick="sendReply('+pid+','+c.id+')"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 20l18-8L3 4l3 8-3 8z"/></svg></span></div>' : '')+
    '</div>'+
  '</div>';
}

function renderPostModal(){
  var p = getPost(_openPid); if(!p) return closePostModal();
  document.getElementById('pdTitle').textContent = 'Bài viết của ' + p.author;
  document.getElementById('pdScroll').innerHTML =
    '<div class="pd-post">'+
      '<div class="ph"><div class="av" style="background:'+(p.ac||'#5B6470')+'">'+p.av+'</div>'+
        '<div><div class="nm">'+esc(p.author)+'</div><div class="meta">'+p.time+'</div></div></div>'+
      (p.text?'<div class="txt">'+esc(p.text)+'</div>':'')+
      (p.media?'<div class="media"><div class="play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div></div>':'')+
      '<div class="pd-stat"><span class="rc">👍😄 '+p.likes+'</span><span>'+cmtCount(p)+' bình luận</span></div>'+
      '<div class="pd-bar">'+
        '<div class="a '+(p.liked?'liked':'')+'" onclick="toggleLike('+p.id+')"><svg viewBox="0 0 24 24" fill="'+(p.liked?'currentColor':'none')+'" stroke="currentColor" stroke-width="2"><path d="M12 21C5 14.5 3 11 3 8a4.5 4.5 0 018-2.8A4.5 4.5 0 0121 8c0 3-2 6.5-9 13z"/></svg>Thích</div>'+
        '<div class="a" onclick="document.getElementById(\'pdInput\').focus()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.5 8.5 0 01-12.4 7.5L3 21l2-5.6A8.5 8.5 0 1121 11.5z"/></svg>Bình luận</div>'+
        '<div class="a" onclick="showToast(\'Đã sao chép liên kết bài viết\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7"/><path d="M12 16V4"/><path d="M8 8l4-4 4 4"/></svg>Chia sẻ</div>'+
      '</div>'+
    '</div>'+
    '<div class="pd-sort">Phù hợp nhất <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg></div>'+
    '<div class="pd-list">'+
      (p.comments.length ? p.comments.map(function(c){ return cmtHTML(c, p.id, false); }).join('')
                         : '<div class="pd-empty">Chưa có bình luận. Hãy là người đầu tiên!</div>')+
    '</div>';
}

function openPostModal(id){
  _openPid = id;
  renderPostModal();
  document.getElementById('pdOverlay').classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closePostModal(){
  _openPid = null;
  document.getElementById('pdOverlay').classList.remove('show');
  document.body.style.overflow = '';
}

function findComment(p, cid){ return p.comments.find(function(c){ return c.id===cid; }); }

function likeComment(pid, cid){
  var p = getPost(pid), c = findComment(p, cid);
  if(!c){ p.comments.forEach(function(x){ (x.replies||[]).forEach(function(r){ if(r.id===cid) c=r; }); }); }
  if(!c) return;
  c.liked = !c.liked; c.likes += c.liked ? 1 : -1;
  renderPostModal();
}
function toggleReplies(pid, cid){
  var c = findComment(getPost(pid), cid); if(!c) return;
  c.showReplies = !c.showReplies; renderPostModal();
}
function replyComment(pid, cid){
  var p = getPost(pid), c = findComment(p, cid); if(!c) return;
  p.comments.forEach(function(x){ if(x!==c) x.replying = false; });
  c.replying = true; c.showReplies = true;
  renderPostModal();
  var i = document.getElementById('rep'+cid); if(i) i.focus();
}
function sendReply(pid, cid){
  var inp = document.getElementById('rep'+cid); if(!inp || !inp.value.trim()) return;
  var p = getPost(pid), c = findComment(p, cid);
  c.replies.push(cmt('Bạn', inp.value.trim(), 'Vừa xong', '#5B6470'));
  c.replying = false; c.showReplies = true;
  renderPostModal(); render();
}
function sendComment(){
  var inp = document.getElementById('pdInput'); if(!inp.value.trim()) return;
  var p = getPost(_openPid);
  p.comments.push(cmt('Bạn', inp.value.trim(), 'Vừa xong', '#5B6470'));
  inp.value = '';
  renderPostModal(); render();
  var s = document.getElementById('pdScroll'); s.scrollTop = s.scrollHeight;
}

render();
