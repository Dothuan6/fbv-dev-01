var ta = document.getElementById('ta');
function count(){
  var n = ta.value.length;
  document.getElementById('num').textContent = n + '/2000';
  document.getElementById('left').textContent = 'Còn ' + (2000 - n) + ' ký tự';
  document.getElementById('postBtn').classList.toggle('ready', n > 0);
}
function openSheet(){ document.getElementById('overlay').classList.add('show'); document.getElementById('privSheet').classList.add('show'); }
function closeSheet(){ document.getElementById('overlay').classList.remove('show'); document.getElementById('privSheet').classList.remove('show'); }
function pick(label, el){
  document.getElementById('privLabel').textContent = label;
  document.querySelectorAll('#privSheet .ck').forEach(function(c){ c.style.visibility = 'hidden'; });
  el.querySelector('.ck').style.visibility = 'visible';
  closeSheet();
  showToast('Cập nhật quyền riêng tư thành công');
}
