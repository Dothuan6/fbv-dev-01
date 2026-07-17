var currentTab = 'email';

function switchTab(t){
  currentTab = t;
  document.querySelectorAll('.tab').forEach(el=>el.classList.toggle('active', el.dataset.tab===t));
  document.getElementById('emailGroup').style.display = t==='email' ? '' : 'none';
  document.getElementById('phoneGroup').style.display = t==='phone' ? '' : 'none';
}

function goNext(){
  // SĐT → xác thực OTP; Email → nhập mật khẩu
  window.location.href = currentTab === 'phone' ? 'otp.html' : 'password.html';
}
