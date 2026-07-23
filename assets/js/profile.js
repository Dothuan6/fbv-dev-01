function showTab(id, el){
  document.querySelectorAll('.pf-tab').forEach(function(t){ t.classList.remove('active'); });
  el.classList.add('active');
  document.querySelectorAll('.panel').forEach(function(p){ p.classList.toggle('active', p.id === id); });
}

// Nếu mở từ danh sách thành viên nhóm, hiển thị đúng người
(function(){
  var raw; try{ raw = sessionStorage.getItem('viewProfile'); }catch(e){}
  if(!raw) return;
  try{ sessionStorage.removeItem('viewProfile'); }catch(e){}
  var p; try{ p = JSON.parse(raw); }catch(e){ return; }
  if(!p || !p.name) return;
  var handle = '@' + p.name.toLowerCase().replace(/\s+/g,'');
  document.querySelector('.pf-avatar').textContent = p.av || p.name[0];
  if(p.color) document.querySelector('.pf-avatar').style.background = p.color;
  document.querySelector('.pf-name').textContent = p.name;
  document.querySelector('.pf-handle').textContent = handle;
  document.title = 'FBV.ONE — ' + p.name;
  var uname = document.querySelector('.info-row .val'); if(uname) uname.textContent = handle;
})();
