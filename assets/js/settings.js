var _cb = null;
function showDialog(o){
  var title = document.getElementById('dlgTitle');
  title.textContent = o.title || ''; title.style.display = o.title ? '' : 'none';
  document.getElementById('dlgMsg').textContent = o.msg;
  var ok = document.getElementById('dlgOk');
  ok.textContent = o.okText || 'Xác nhận';
  ok.className = 'ok' + (o.danger ? ' danger' : '');
  _cb = o.onConfirm || null;
  ok.onclick = function(){ dlgClose(); if(_cb) _cb(); };
  document.getElementById('dlgOverlay').classList.add('show');
}
function dlgClose(){ document.getElementById('dlgOverlay').classList.remove('show'); }

function confirmPassword(){
  showDialog({ title:'Xác nhận đổi mật khẩu', msg:'Chúng tôi sẽ gửi một liên kết đặt lại mật khẩu đến email đã đăng ký của bạn. Bạn có chắc chắn muốn tiếp tục?', okText:'Xác nhận', onConfirm:function(){ location.href='reset-link.html'; } });
}
function confirmDelete(){
  showDialog({ msg:'Xóa tài khoản sẽ xóa tất cả dữ liệu cá nhân của bạn và không thể hoàn tác. Bạn có chắc muốn tiếp tục?', okText:'Xoá', danger:true, onConfirm:function(){ location.href='welcome.html'; } });
}
function confirmLogout(){
  showDialog({ msg:'Đăng xuất khỏi thiết bị này?', okText:'Đăng xuất', danger:true, onConfirm:function(){ location.href='welcome.html'; } });
}
document.getElementById('dlgOverlay').addEventListener('click', function(e){ if(e.target === this) dlgClose(); });
