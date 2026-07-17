if(window.innerWidth < 1024) location.replace('worklog.html');
window.addEventListener('resize', function(){ if(window.innerWidth < 1024) location.replace('worklog.html'); });

var body=document.getElementById('body'), mInput=document.getElementById('mInput'), shell=document.getElementById('shell');
function esc(s){ return s.replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
function nowHH(){ var t=new Date(); return String(t.getHours()).padStart(2,'0')+':'+String(t.getMinutes()).padStart(2,'0'); }

mInput.addEventListener('keydown', function(e){ if(e.key==='Enter') send(); });
function send(){
  if(!mInput.value.trim()) return;
  var d=document.createElement('div'); d.className='msg';
  d.innerHTML='<span class="mt">'+esc(mInput.value.trim())+'</span><span class="t">'+nowHH()+'</span>';
  body.appendChild(d); body.scrollTop=body.scrollHeight; mInput.value='';
}

function toggleInfo(){ document.getElementById('infoCol').classList.toggle('show'); document.getElementById('infoToggle').classList.toggle('active'); }

function openSearch(){ shell.classList.add('searching'); document.getElementById('sInput').focus(); }
function closeSearch(){ shell.classList.remove('searching'); document.getElementById('sInput').value=''; document.getElementById('sCnt').textContent=''; clearHL(); }
function clearHL(){ document.querySelectorAll('#body .mt').forEach(function(el){ if(el.dataset.raw!=null) el.textContent=el.dataset.raw; }); }
function escRe(s){ return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }
function doSearch(){
  var term=document.getElementById('sInput').value.trim(), n=0;
  document.querySelectorAll('#body .mt').forEach(function(el){
    var raw=el.dataset.raw!=null?el.dataset.raw:el.textContent; el.dataset.raw=raw;
    if(term){ var re=new RegExp('('+escRe(term)+')','gi'), m=raw.match(re); if(m){ el.innerHTML=raw.replace(re,'<mark>$1</mark>'); n+=m.length; } else el.textContent=raw; }
    else el.textContent=raw;
  });
  document.getElementById('sCnt').textContent = term ? (n+' kết quả') : '';
}
