// Màn rộng dùng bản desktop bản tin
function goDesktopIfWide(){ if(window.innerWidth >= 1024) location.replace('app-feed.html'); }
goDesktopIfWide();
window.addEventListener('resize', goDesktopIfWide);

function openSheet(id){
  document.getElementById('overlay').classList.add('show');
  document.getElementById(id).classList.add('show');
}
function closeSheet(){
  document.getElementById('overlay').classList.remove('show');
  document.querySelectorAll('.sheet').forEach(function(s){ s.classList.remove('show'); });
}
