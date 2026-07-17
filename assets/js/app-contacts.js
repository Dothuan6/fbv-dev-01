if(window.innerWidth < 1024) location.replace('contacts.html');
window.addEventListener('resize', function(){ if(window.innerWidth < 1024) location.replace('contacts.html'); });

var C = {rn:'linear-gradient(135deg,#F5C543,#9B6BF0)', leaf:'linear-gradient(135deg,#1FB6D6,#1877F2)', dark:'linear-gradient(135deg,#3A1C5A,#7B2FF7)', land:'linear-gradient(135deg,#4FA8F5,#16A085)', gray:'#5B6470', blue:'linear-gradient(135deg,#4FA8F5,#1877F2)'};

var friends = [
  {n:'account001', av:'200', c:C.dark},
  {n:'Ái Mỹ', av:'Á', c:C.land},
  {n:'Change name55', av:'C', c:C.leaf},
  {n:'rtetetet', av:'R', c:C.gray},
  {n:'Thuận Đỗ', av:'T', c:C.gray}
];
var groups = [
  {n:'rtetetet, account001, Chang...', av:'RN', c:C.rn, sub:'85 thành viên'},
  {n:'[2.HOÀNG TÚ]', av:'HT', c:C.land, sub:'12 thành viên'}
];
var recv = [
  {n:'rtetetet', av:'R', c:C.rn, sub:'Muốn kết bạn với bạn'},
  {n:'Change name55', av:'C', c:C.leaf, sub:'Muốn kết bạn với bạn'}
];
var sent = [
  {n:'[2.HOÀNG TÚ]', av:'HT', c:C.land, sub:'Có thể kết bạn'},
  {n:'+84966613625', av:'+', c:C.blue, sub:'Có thể kết bạn'},
  {n:'+84912345678', av:'+', c:C.gray, sub:'Có thể kết bạn'}
];

// Bạn bè theo bảng chữ cái
function renderFriends(filter){
  var box=document.getElementById('friendList'); box.innerHTML='';
  var list = friends.filter(function(f){ return !filter || f.n.toLowerCase().indexOf(filter.toLowerCase())>-1; })
    .sort(function(a,b){ return a.n.localeCompare(b.n,'vi'); });
  var cur='';
  list.forEach(function(f){
    var L=f.n[0].toUpperCase();
    if(L!==cur){ cur=L; var g=document.createElement('div'); g.className='grp-label'; g.textContent=L; box.appendChild(g); }
    var el=document.createElement('div'); el.className='frow';
    el.innerHTML='<div class="av" style="background:'+f.c+'">'+f.av+'</div><div class="nm">'+f.n+'</div>'+
      '<div class="acts"><button title="Nhắn tin" onclick="event.stopPropagation();location.href=\'app.html\'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.5 8.5 0 01-12.4 7.5L3 21l2-5.6A8.5 8.5 0 1121 11.5z"/></svg></button>'+
      '<button title="Gọi thoại" onclick="event.stopPropagation();location.href=\'call.html?type=voice&name='+encodeURIComponent(f.n)+'\'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 4c.5 0 1 .3 1.2.8l1.2 2.8c.2.5.1 1-.3 1.4l-1.3 1.3c1 2 2.6 3.6 4.6 4.6l1.3-1.3c.4-.4.9-.5 1.4-.3l2.8 1.2c.5.2.8.7.8 1.2v2.8c0 .8-.7 1.5-1.5 1.4C9.6 19.6 4.4 14.4 4 6.5 3.9 5.7 4.6 5 5.4 5z"/></svg></button></div>';
    el.onclick=function(){ openFriendModal && openFriendModal({name:f.n, av:f.av, color:f.c}); };
    box.appendChild(el);
  });
  if(!list.length) box.innerHTML='<div class="empty">Không tìm thấy bạn bè</div>';
}
function filterFriends(v){ renderFriends(v); }

function renderGroups(){
  var box=document.getElementById('groupList'); box.innerHTML='';
  groups.forEach(function(g){
    var el=document.createElement('div'); el.className='frow'; el.style.marginBottom='6px';
    el.innerHTML='<div class="av" style="background:'+g.c+'">'+g.av+'</div><div class="nm">'+g.n+'<div style="font-size:13px;color:var(--text-secondary)">'+g.sub+'</div></div>';
    el.onclick=function(){ location.href='app.html'; };
    box.appendChild(el);
  });
}

function reqCard(p, kind){
  var btns = kind==='recv'
    ? '<div class="btns"><button class="btn-reject" onclick="respond(this,\'Đã từ chối\')">Từ chối</button><button class="btn-accept" onclick="respond(this,\'Bạn bè\')">Chấp nhận</button></div>'
    : '<div class="btns"><button class="btn-revoke" onclick="respond(this,\'Đã thu hồi\')">Thu hồi</button></div>';
  return '<div class="req-card"><div class="top"><div class="av" style="background:'+p.c+'">'+p.av+'</div><div><div class="nm">'+p.n+'</div><div class="sub">'+p.sub+'</div></div></div>'+btns+'</div>';
}
function renderReq(){
  document.getElementById('reqRecv').innerHTML = recv.map(function(p){ return reqCard(p,'recv'); }).join('');
  document.getElementById('reqSent').innerHTML = sent.map(function(p){ return reqCard(p,'sent'); }).join('');
}
function reqTab(which, el){
  document.querySelectorAll('.req-tab').forEach(function(t){ t.classList.remove('active'); }); el.classList.add('active');
  document.getElementById('reqRecv').style.display = which==='recv' ? '' : 'none';
  document.getElementById('reqSent').style.display = which==='sent' ? '' : 'none';
}
function respond(btn, status){
  var card = btn.closest('.req-card');
  var s = document.createElement('div'); s.className='req-status'; s.textContent=status;
  card.querySelector('.btns').replaceWith(s);
}

var TITLES = {friends:'Danh sách bạn bè', groups:'Danh sách nhóm', requests:'Lời mời kết bạn'};
function showView(id, el){
  document.querySelectorAll('.nav-item').forEach(function(n){ n.classList.remove('active'); }); el.classList.add('active');
  document.querySelectorAll('.panel').forEach(function(p){ p.classList.toggle('active', p.id===id); });
  document.getElementById('viewTitle').textContent = TITLES[id];
}

renderFriends(''); renderGroups(); renderReq();
