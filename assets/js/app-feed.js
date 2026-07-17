if(window.innerWidth < 1024) location.replace('feed.html');
window.addEventListener('resize', function(){ if(window.innerWidth < 1024) location.replace('feed.html'); });

function esc(s){ return s.replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }

var posts = [
  {id:1, author:'rtetetet', av:'R', time:'9 giờ trước', text:'Video tets', media:true, liked:false, likes:3, comments:[]},
  {id:3, author:'account001', av:'200', ac:'linear-gradient(135deg,#3A1C5A,#7B2FF7)', time:'1 ngày trước', text:'', media:true, liked:false, likes:8, comments:[]},
  {id:2, author:'account001', av:'200', ac:'linear-gradient(135deg,#3A1C5A,#7B2FF7)', time:'29/04/2026 (đã chỉnh sửa)', text:'Hi, Im Thomas. here my new account', media:false, liked:false, likes:4, comments:[{n:'Change name55', c:'Chào bạn 👋'}]}
];

function render(){
  var box=document.getElementById('postList'); box.innerHTML='';
  posts.forEach(function(p){
    var el=document.createElement('div'); el.className='card post'; el.dataset.id=p.id;
    el.innerHTML =
      '<div class="ph"><div class="av" style="background:'+(p.ac||'#5B6470')+'">'+p.av+'</div>'+
        '<div><div class="nm">'+p.author+'</div><div class="meta">'+p.time+'</div></div>'+
        '<div class="more" onclick="openPostMenu(event,'+p.id+')">&#8943;</div></div>'+
      (p.text?'<div class="txt">'+esc(p.text)+'</div>':'')+
      (p.media?'<div class="media"><div class="play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div></div>':'')+
      '<div class="stat">'+p.likes+' lượt thích · '+p.comments.length+' bình luận</div>'+
      '<div class="bar"><div class="a '+(p.liked?'liked':'')+'" onclick="toggleLike('+p.id+')"><svg viewBox="0 0 24 24" fill="'+(p.liked?'currentColor':'none')+'" stroke="currentColor" stroke-width="2"><path d="M12 21C5 14.5 3 11 3 8a4.5 4.5 0 018-2.8A4.5 4.5 0 0121 8c0 3-2 6.5-9 13z"/></svg>Thích</div>'+
        '<div class="a" onclick="toggleComments('+p.id+')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.5 8.5 0 01-12.4 7.5L3 21l2-5.6A8.5 8.5 0 1121 11.5z"/></svg>Bình luận</div></div>'+
      '<div class="comments" id="cmt'+p.id+'">'+
        p.comments.map(function(c){ return '<div class="cmt"><div class="av">'+c.n[0]+'</div><div class="bub"><div class="n">'+c.n+'</div><div class="c">'+esc(c.c)+'</div></div></div>'; }).join('')+
        '<div class="cmt-input"><div class="av">R</div><input placeholder="Viết bình luận..." onkeydown="if(event.key===\'Enter\')addComment('+p.id+',this)"><span class="send" onclick="addComment('+p.id+',this.previousElementSibling)"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 20l18-8L3 4l3 8-3 8z"/></svg></span></div>'+
      '</div>';
    box.appendChild(el);
  });
}

function toggleLike(id){ var p=posts.find(function(x){return x.id===id;}); p.liked=!p.liked; p.likes+=p.liked?1:-1; render(); }
function toggleComments(id){ var c=document.getElementById('cmt'+id); c.classList.toggle('show'); }
function addComment(id, inp){
  if(!inp.value.trim()) return;
  var p=posts.find(function(x){return x.id===id;}); p.comments.push({n:'Bạn', c:inp.value.trim()});
  render(); document.getElementById('cmt'+id).classList.add('show');
}

// Menu bài đăng
var _pid=null;
function openPostMenu(e, id){
  e.stopPropagation(); _pid=id;
  var m=document.getElementById('postMenu'); m.classList.add('show');
  var r=e.currentTarget.getBoundingClientRect();
  m.style.left=Math.min(r.left,window.innerWidth-m.offsetWidth-8)+'px'; m.style.top=(r.bottom+6)+'px';
}
function closePop(){ document.getElementById('postMenu').classList.remove('show'); }
function deletePost(){ posts=posts.filter(function(p){return p.id!==_pid;}); render(); closePop(); }
document.addEventListener('click', function(e){ if(!e.target.closest('.more') && !e.target.closest('#postMenu')) closePop(); });

// Modal soạn bài
function openCompose(){ document.getElementById('composeOverlay').classList.add('show'); document.getElementById('composeText').focus(); }
function closeCompose(){ document.getElementById('composeOverlay').classList.remove('show'); document.getElementById('composeText').value=''; onType(); }
function onType(){ document.getElementById('postBtn').classList.toggle('ready', document.getElementById('composeText').value.trim().length>0); }
function publish(){
  var t=document.getElementById('composeText').value.trim(); if(!t) return;
  posts.unshift({id:Date.now(), author:'rtetetet', av:'R', time:'Vừa xong', text:t, media:false, liked:false, likes:0, comments:[]});
  render(); closeCompose();
}
document.getElementById('composeOverlay').addEventListener('click', function(e){ if(e.target===this) closeCompose(); });

render();
