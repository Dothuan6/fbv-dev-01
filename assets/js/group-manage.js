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
