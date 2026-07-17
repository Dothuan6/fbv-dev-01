function openSheet(id){ document.getElementById('overlay').classList.add('show'); document.getElementById(id).classList.add('show'); }
function closeSheet(){ document.getElementById('overlay').classList.remove('show'); document.querySelectorAll('.sheet').forEach(function(s){ s.classList.remove('show'); }); }
function pick(kind, label, el){
  el.parentNode.querySelectorAll('.opt-item').forEach(function(o){ o.classList.remove('sel'); });
  el.classList.add('sel');
  document.getElementById(kind === 'font' ? 'fontVal' : 'langVal').textContent = label;
  closeSheet();
}
