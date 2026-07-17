function pickGender(el){
  document.querySelectorAll('.gender-opt').forEach(function(g){ g.classList.remove('sel'); });
  el.classList.add('sel');
  document.querySelector('.ep-update').classList.add('ready');
}
