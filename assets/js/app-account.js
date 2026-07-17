function goBack(){ if(history.length>1) history.back(); else location.href='app.html'; }

function fill(sel, from, to, val){ var s=document.getElementById(sel); for(var i=from;i<=to;i++){ var o=document.createElement('option'); o.value=i; o.textContent=(i<10?'0':'')+i; s.appendChild(o);} s.value=val; }
fill('edD',1,31,6); fill('edM',1,12,1);
(function(){ var s=document.getElementById('edY'); for(var y=2010;y>=1970;y--){ var o=document.createElement('option'); o.value=y; o.textContent=y; s.appendChild(o);} s.value=2002; })();

function openEdit(){ document.getElementById('editOverlay').classList.add('show'); }
function closeEdit(){ document.getElementById('editOverlay').classList.remove('show'); }
function pickG(el){ document.querySelectorAll('.gopt').forEach(function(g){g.classList.remove('sel');}); el.classList.add('sel'); }
function saveEdit(){
  document.getElementById('pName').textContent = document.getElementById('edName').value || 'rtetetet';
  document.getElementById('pGender').textContent = document.querySelector('.gopt.sel').textContent.trim();
  var d=+document.getElementById('edD').value, m=+document.getElementById('edM').value, y=document.getElementById('edY').value;
  document.getElementById('pDob').textContent = (d<10?'0':'')+d+' tháng '+(m<10?'0':'')+m+', '+y;
  closeEdit();
}
document.getElementById('editOverlay').addEventListener('click', function(e){ if(e.target===this) closeEdit(); });
document.body.addEventListener('click', function(e){ if(e.target===document.body) goBack(); });
