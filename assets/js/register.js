var currentTab = 'email';

function switchTab(t){
  currentTab = t;
  document.querySelectorAll('.tab').forEach(el=>el.classList.toggle('active', el.dataset.tab===t));
  document.getElementById('emailGroup').style.display = t==='email' ? '' : 'none';
  document.getElementById('phoneGroup').style.display = t==='phone' ? '' : 'none';
  validate();
}

// Bật nút "Tiếp theo" khi đã nhập email/SĐT và tích đồng ý điều khoản
function validate(){
  var agreed = document.getElementById('agree').checked;
  var val = currentTab === 'email'
    ? document.getElementById('emailInput').value.trim()
    : document.getElementById('phoneInput').value.trim();
  document.getElementById('nextBtn').disabled = !(val && agreed);
}

function goNext(){
  if(document.getElementById('nextBtn').disabled) return;
  // SĐT → xác thực OTP; Email → thiết lập mật khẩu
  window.location.href = currentTab === 'phone' ? 'otp.html' : 'set-password.html';
}
