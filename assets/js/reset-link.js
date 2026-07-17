// Đếm ngược gửi lại mã
var sec = 118;
var el = document.getElementById('countdown');
var timer = setInterval(function(){
  sec--;
  if(sec <= 0){
    clearInterval(timer);
    el.innerHTML = '<a href="#" style="color:var(--primary-link);text-decoration:none">Gửi lại mã</a>';
  } else {
    el.textContent = 'Gửi lại mã (' + sec + 's)';
  }
}, 1000);
