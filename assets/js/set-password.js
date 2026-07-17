function togglePw(inpId, eyeId){
  var inp = document.getElementById(inpId);
  var line = document.querySelector('#' + eyeId + ' line');
  var show = inp.type === 'password';
  inp.type = show ? 'text' : 'password';
  line.style.display = show ? 'none' : '';
}
