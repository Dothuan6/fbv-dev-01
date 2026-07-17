// Thêm người vào nhóm — chọn bạn bè

// Bạn bè có thể thêm (chưa ở trong nhóm); inGroup: true sẽ bị ẩn
var friends = [
  {n:'Ái Mỹ', av:'Á', c:'linear-gradient(135deg,#4FA8F5,#16A085)'},
  {n:'Change name55', av:'C', c:'linear-gradient(135deg,#1FB6D6,#1877F2)'},
  {n:'rtetetet', av:'R', c:'#5B6470'},
  {n:'Thuận Đỗ', av:'T', c:'#8E8E93'},
  {n:'account001', av:'200', c:'linear-gradient(135deg,#3A1C5A,#7B2FF7)', inGroup:true}
];
var picked = {};

function render(filter){
  var box = document.getElementById('list'); box.innerHTML = '';
  var visible = 0;
  friends.forEach(function(f, i){
    if(f.inGroup) return;   // đã ở trong nhóm
    if(filter && f.n.toLowerCase().indexOf(filter.toLowerCase()) === -1) return;
    visible++;
    var el = document.createElement('div');
    el.className = 'gam-item' + (picked[i] ? ' sel' : '');
    el.innerHTML = '<span class="cb"></span><div class="av" style="background:'+f.c+'">'+f.av+'</div><div class="nm">'+f.n+'</div>';
    el.onclick = function(){ picked[i] = !picked[i]; render(document.getElementById('q').value.trim()); };
    box.appendChild(el);
  });
  document.getElementById('empty').style.display = visible ? 'none' : 'flex';
  document.getElementById('list').style.display = visible ? '' : 'none';
  var n = Object.keys(picked).filter(function(k){ return picked[k]; }).length;
  document.getElementById('pickedCount').textContent = n;
  document.getElementById('sendBtn').disabled = n === 0;
}
function filterList(){ render(document.getElementById('q').value.trim()); }

function addMembers(){
  var n = Object.keys(picked).filter(function(k){ return picked[k]; }).length;
  if(!n) return;
  alert('Đã thêm ' + n + ' thành viên vào nhóm');
  window.location.href = 'group-manage.html';
}

render('');
