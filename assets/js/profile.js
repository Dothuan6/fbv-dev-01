function showTab(id, el){
  document.querySelectorAll('.pf-tab').forEach(function(t){ t.classList.remove('active'); });
  el.classList.add('active');
  document.querySelectorAll('.panel').forEach(function(p){ p.classList.toggle('active', p.id === id); });
}
