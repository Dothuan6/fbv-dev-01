function togglePw(){
  var inp = document.getElementById('pw');
  var line = document.querySelector('#eyeIcon line');
  var show = inp.type === 'password';
  inp.type = show ? 'text' : 'password';
  line.style.display = show ? 'none' : '';   // ẩn gạch chéo khi đang hiện mật khẩu
}
