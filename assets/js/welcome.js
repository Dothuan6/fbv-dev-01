var slides = document.querySelectorAll('.slide');
var dotsBox = document.getElementById('dots');
var idx = 0;

// tạo dots
slides.forEach(function(_, i){
  var d = document.createElement('div');
  d.className = 'dot' + (i===0 ? ' active' : '');
  d.onclick = function(){ go(i); };
  dotsBox.appendChild(d);
});
var dots = document.querySelectorAll('.dot');

function go(n){
  slides[idx].classList.remove('active');
  dots[idx].classList.remove('active');
  idx = (n + slides.length) % slides.length;
  slides[idx].classList.add('active');
  dots[idx].classList.add('active');
}

// tự chạy + vuốt
var auto = setInterval(function(){ go(idx+1); }, 3500);
var startX = null;
var sl = document.getElementById('slides');
sl.addEventListener('touchstart', function(e){ startX = e.touches[0].clientX; clearInterval(auto); });
sl.addEventListener('touchend', function(e){
  if(startX===null) return;
  var dx = e.changedTouches[0].clientX - startX;
  if(Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1));
  startX = null;
});
