// Tự nhảy ô khi nhập / quay lại khi xóa
var cells = Array.from(document.querySelectorAll('.otp-cell'));
cells.forEach(function(cell, i){
  cell.addEventListener('input', function(){
    this.value = this.value.replace(/\D/g,'');           // chỉ nhận số
    if(this.value && i < cells.length - 1) cells[i+1].focus();
  });
  cell.addEventListener('keydown', function(e){
    if(e.key === 'Backspace' && !this.value && i > 0) cells[i-1].focus();
  });
  cell.addEventListener('paste', function(e){
    var data = (e.clipboardData.getData('text') || '').replace(/\D/g,'').slice(0,6).split('');
    if(data.length){ e.preventDefault(); data.forEach(function(d,k){ if(cells[k]) cells[k].value = d; }); cells[Math.min(data.length, cells.length-1)].focus(); }
  });
});

// Đếm ngược gửi lại mã
var sec = 119, el = document.getElementById('countdown');
var timer = setInterval(function(){
  sec--;
  if(sec <= 0){ clearInterval(timer); el.innerHTML = '<a href="#" style="color:var(--primary-link);text-decoration:none">Gửi lại mã</a>'; }
  else el.textContent = 'Gửi lại mã (' + sec + 's)';
}, 1000);
