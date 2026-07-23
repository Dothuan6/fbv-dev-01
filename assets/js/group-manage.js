// Quản lý nhóm (Tùy chọn)

// Menu "Thêm" (3 chấm)
function toggleMore(e){
  e.stopPropagation();
  var m = document.getElementById('gmMore');
  // neo menu ngay dưới nút Thêm
  var r = document.getElementById('moreBtn').getBoundingClientRect();
  var sc = document.querySelector('.gm-screen').getBoundingClientRect();
  m.style.top = (r.bottom - sc.top + 6) + 'px';
  m.classList.toggle('show');
}
function closeMore(){ document.getElementById('gmMore').classList.remove('show'); }
document.addEventListener('click', function(e){
  if(!e.target.closest('#moreBtn') && !e.target.closest('#gmMore')) closeMore();
});

// Tabs
function showTab(id, el){
  document.querySelectorAll('.gm-tab').forEach(function(t){ t.classList.remove('active'); });
  el.classList.add('active');
  document.querySelectorAll('.gm-panel').forEach(function(p){ p.classList.toggle('active', p.id === id); });
}

// Sheet đổi tên nhóm
function openRename(){
  document.getElementById('rnInput').value = document.getElementById('gmName').textContent.trim();
  document.getElementById('rnOverlay').classList.add('show');
  document.getElementById('rnSheet').classList.add('show');
  document.getElementById('rnInput').focus();
}
function closeRename(){
  document.getElementById('rnOverlay').classList.remove('show');
  document.getElementById('rnSheet').classList.remove('show');
}
function saveRename(){
  var v = document.getElementById('rnInput').value.trim();
  if(v){
    document.getElementById('gmName').textContent = v;
    document.getElementById('gmAvChar').textContent = v[0].toUpperCase();
    document.title = 'FBV.ONE — ' + v;
  }
  closeRename();
}
document.getElementById('rnInput').addEventListener('keydown', function(e){ if(e.key === 'Enter') saveRename(); });

/* ===== Thành viên: xoá / bổ nhiệm phó nhóm ===== */
// role: 'leader' (trưởng nhóm) | 'deputy' (phó nhóm) | '' (thành viên)
// Giả định người dùng hiện tại là Trưởng nhóm -> có quyền quản lý.
var members = [
  {id:1, n:'Thuan weber', av:'TW', c:'#5B6470', role:'leader'},
  {id:2, n:'Thuan ABC', av:'T', c:'#8E8E93', role:''},
  {id:3, n:'account001', av:'200', c:'linear-gradient(135deg,#3A1C5A,#7B2FF7)', role:''}
];
var ROLE_LABEL = {leader:'Trưởng nhóm', deputy:'Phó nhóm'};
var _mid = null;

function renderMembers(){
  var box = document.getElementById('gmMemList'); box.innerHTML = '';
  members.forEach(function(m){
    var el = document.createElement('div'); el.className = 'gm-mem';
    var role = m.role ? '<div class="role">'+ROLE_LABEL[m.role]+'</div>' : '';
    // Trưởng nhóm không có menu tùy chọn
    var menu = m.role === 'leader' ? '' :
      '<div class="mem-more" onclick="openMemMenu('+m.id+')"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg></div>';
    el.innerHTML = '<div class="av" style="background:'+m.c+'">'+m.av+'</div><div class="nm">'+m.n+'</div>'+role+menu;
    box.appendChild(el);
  });
}

function openMemMenu(id){
  _mid = id;
  var m = members.find(function(x){ return x.id === id; }); if(!m) return;
  document.getElementById('msAv').style.background = m.c;
  document.getElementById('msAv').textContent = m.av;
  document.getElementById('msName').textContent = m.n;
  document.getElementById('msPromoteLbl').textContent = m.role === 'deputy' ? 'Gỡ vai trò phó nhóm' : 'Bổ nhiệm phó nhóm';
  document.getElementById('memOverlay').classList.add('show');
  document.getElementById('memSheet').classList.add('show');
}
function closeMemMenu(){
  document.getElementById('memOverlay').classList.remove('show');
  document.getElementById('memSheet').classList.remove('show');
}
function viewProfile(){
  var m = members.find(function(x){ return x.id === _mid; }); closeMemMenu(); if(!m) return;
  try{ sessionStorage.setItem('viewProfile', JSON.stringify({name:m.n, av:m.av, color:m.c})); }catch(e){}
  location.href = 'profile.html';
}
function promoteMember(){
  var m = members.find(function(x){ return x.id === _mid; }); if(!m) return;
  if(m.role === 'deputy'){ m.role = ''; toast(m.n + ' không còn là phó nhóm'); }
  else { m.role = 'deputy'; toast('Đã bổ nhiệm ' + m.n + ' làm phó nhóm'); }
  renderMembers(); closeMemMenu();
}
function removeMember(){
  var m = members.find(function(x){ return x.id === _mid; }); if(!m) return;
  var name = m.n;
  members = members.filter(function(x){ return x.id !== _mid; });
  renderMembers(); closeMemMenu(); toast('Đã xoá ' + name + ' khỏi nhóm');
}
function toast(msg){ if(window.showToast) showToast(msg); }

renderMembers();
