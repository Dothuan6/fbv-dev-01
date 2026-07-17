// Màn rộng dùng bản desktop cá nhân
function goDesktopIfWide(){ if(window.innerWidth >= 1024) location.replace('app.html'); }
goDesktopIfWide();
window.addEventListener('resize', goDesktopIfWide);
