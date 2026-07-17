function showTab(id, el){
  document.querySelectorAll('.fr-tab').forEach(function(t){ t.classList.remove('active'); });
  el.classList.add('active');
  document.querySelectorAll('.panel').forEach(function(p){ p.classList.toggle('active', p.id === id); });
}
function revoke(btn){ btn.textContent = 'Đã thu hồi'; btn.classList.add('done'); btn.disabled = true; }
// Phản hồi lời mời đã nhận: thay 2 nút bằng trạng thái
function respond(btn, status){
  var actions = btn.parentNode;
  var span = document.createElement('span');
  span.className = 'fr-status'; span.textContent = status;
  actions.parentNode.replaceChild(span, actions);
}
