// Màn rộng dùng bản desktop danh bạ
function goDesktopIfWide(){ if(window.innerWidth >= 1024) location.replace('app-contacts.html'); }
goDesktopIfWide();
window.addEventListener('resize', goDesktopIfWide);

function switchTab(el){
  document.querySelectorAll('.c-tab').forEach(function(t){ t.classList.remove('active'); });
  el.classList.add('active');
}
