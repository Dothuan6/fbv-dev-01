// Màn rộng dùng bản desktop nhật ký
if(window.innerWidth >= 1024) location.replace('app-worklog.html');
window.addEventListener('resize', function(){ if(window.innerWidth >= 1024) location.replace('app-worklog.html'); });

function goBack(){
  if(document.referrer) history.back();
  else if(history.length > 1) history.back();
  else location.href = 'account.html';
}

var screen = document.getElementById('screen');
var input = document.getElementById('msgInput');
var q = document.getElementById('q');
var clr = document.getElementById('clr');
var texts = Array.from(document.querySelectorAll('.msg-text'));
var originals = texts.map(function(t){ return t.textContent; });
var marks = [], cur = 0;

// Gửi nhật ký
input.addEventListener('keydown', function(e){
  if(e.key === 'Enter' && this.value.trim()){
    var t = new Date(), hh = String(t.getHours()).padStart(2,'0')+':'+String(t.getMinutes()).padStart(2,'0');
    var b = document.createElement('div'); b.className = 'bubble sent';
    var m = document.createElement('span'); m.className='msg-text'; m.textContent = this.value.trim();
    var tm = document.createElement('span'); tm.className='time'; tm.textContent = hh;
    b.appendChild(m); b.appendChild(tm);
    document.getElementById('body').appendChild(b);
    texts.push(m); originals.push(m.textContent);
    document.getElementById('body').scrollTop = 1e9;
    this.value = '';
  }
});

function openSearch(){ screen.classList.add('searching'); q.focus(); }
function closeSearch(){ screen.classList.remove('searching'); q.value=''; clearMarks(); clr.classList.remove('show'); }
function clearQ(){ q.value=''; clr.classList.remove('show'); clearMarks(); updateCount(); q.focus(); }

function clearMarks(){
  texts.forEach(function(t,i){ t.textContent = originals[i]; });
  marks = []; cur = 0;
}
function escapeRe(s){ return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }

function doSearch(){
  var term = q.value.trim();
  clr.classList.toggle('show', term.length>0);
  clearMarks();
  if(term){
    var re = new RegExp('('+escapeRe(term)+')','gi');
    texts.forEach(function(t,i){
      if(re.test(originals[i])){
        t.innerHTML = originals[i].replace(re, '<mark>$1</mark>');
      }
    });
    marks = Array.from(document.querySelectorAll('mark'));
    if(marks.length){ cur = 0; focusMark(); }
  }
  updateCount();
}
function focusMark(){
  marks.forEach(function(m){ m.classList.remove('cur'); });
  if(marks[cur]){ marks[cur].classList.add('cur'); marks[cur].scrollIntoView({block:'center'}); }
}
function navMatch(d){ if(!marks.length) return; cur=(cur+d+marks.length)%marks.length; focusMark(); updateCount(); }
function updateCount(){ document.getElementById('count').textContent = (marks.length? (cur+1):0) + ' / ' + marks.length; }
