// Màn rộng dùng bản desktop (shell 3 cột); màn hẹp giữ bản mobile này
function goDesktopIfWide(){ if(window.innerWidth >= 1024) location.replace('app.html'); }
goDesktopIfWide();
window.addEventListener('resize', goDesktopIfWide);

function toggleAddMenu(e){
  if(e) e.stopPropagation();
  document.getElementById('addMenu').classList.toggle('show');
  document.getElementById('addOverlay').classList.toggle('show');
}
