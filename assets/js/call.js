var params = new URLSearchParams(location.search);
var type = params.get('type') || 'voice';      // voice | video
var name = params.get('name') || 'account001';

document.getElementById('callName').textContent = name;
if(type === 'video'){
  document.getElementById('callType').textContent = 'Cuộc gọi video đi';
  document.getElementById('camBtn').style.display = '';   // hiện nút camera cho video
  document.getElementById('camBtn').classList.add('active');
}

function toggle(btn){ btn.classList.toggle('active'); }
function endCall(){
  if(history.length > 1) history.back();
  else window.location.href = 'chat.html';
}
