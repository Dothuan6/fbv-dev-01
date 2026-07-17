/* Account modal dùng chung — nhúng vào shell desktop bằng <script src="account-modal.js">.
   Gọi openAccountModal() (vd. từ avatar rail) để mở "Thông tin tài khoản" NỔI trên màn hiện tại. */
(function(){
  var pencil = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/></svg>';
  var xIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>';
  var backIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>';

  var wrap = document.createElement('div');
  wrap.innerHTML =
    '<div class="acct-overlay" id="acctOverlay">'+
      '<div class="acct-modal">'+
        '<div class="am-head"><h3>Thông tin tài khoản</h3><button class="am-x" onclick="closeAccountModal()">'+xIcon+'</button></div>'+
        '<div class="am-scroll">'+
        '<div class="am-cover"></div>'+
        '<div class="am-avrow"><div class="am-av">R</div></div>'+
        '<div class="am-namerow"><span class="am-nm" id="acctName">rtetetet</span><span class="am-edit" onclick="openAcctEdit()">'+pencil+'</span></div>'+
        '<div class="am-sec"><h4>Thông tin cá nhân</h4>'+
          '<div class="am-irow"><div class="l">Giới tính</div><div class="v" id="acctGender">Nam</div></div>'+
          '<div class="am-irow"><div class="l">Ngày sinh</div><div class="v" id="acctDob">06 tháng 01, 2002</div></div>'+
          '<div class="am-irow"><div class="l">Điện thoại</div><div class="v">+84 995 588 023</div></div>'+
          '<div class="am-note">Chỉ bạn bè có lưu số của bạn trong danh bạ máy xem được số này</div>'+
        '</div>'+
        '<div class="fr-posts"><h4>Bài viết</h4><div id="acctPosts"></div></div>'+
        '</div>'+  /* /am-scroll */
        '<div class="am-foot"><button class="am-update" onclick="openAcctEdit()">'+pencil+'Cập nhật</button></div>'+
      '</div>'+
    '</div>'+
    '<div class="acct-edit-overlay" id="acctEditOverlay">'+
      '<div class="acct-edit">'+
        '<div class="eh"><button class="back" onclick="closeAcctEdit()">'+backIcon+'</button><h3>Cập nhật thông tin cá nhân</h3><button class="x" onclick="closeAcctEdit()">'+xIcon+'</button></div>'+
        '<div class="eb">'+
          '<div class="fld"><label>Tên hiển thị</label><input id="acctEdName" value="rtetetet" /></div>'+
          '<div class="sec-t">Thông tin cá nhân</div>'+
          '<div class="genders"><div class="gopt sel" onclick="acctPickG(this)"><span class="r"></span>Nam</div><div class="gopt" onclick="acctPickG(this)"><span class="r"></span>Nữ</div></div>'+
          '<label style="font-size:14px;color:var(--text-secondary);display:block;margin-bottom:6px">Ngày sinh</label>'+
          '<div class="dob"><select id="acctEdD"></select><select id="acctEdM"></select><select id="acctEdY"></select></div>'+
        '</div>'+
        '<div class="ef"><button class="cancel" onclick="closeAcctEdit()">Hủy</button><button class="ok" onclick="acctSave()">Cập nhật</button></div>'+
      '</div>'+
    '</div>';
  document.body.appendChild(wrap);

  // Bài viết của tôi
  document.getElementById('acctPosts').innerHTML = [
    {t:'Video tets', d:'10 giờ trước', img:true, like:4, cmt:7},
    {t:'Hi, đây là tài khoản mới của mình.', d:'29/04/2026', img:false, like:2, cmt:1}
  ].map(function(p){
    return '<div class="fr-post"><div class="ph"><div class="pa" style="background:linear-gradient(135deg,#3A1C5A,#7B2FF7)">R</div><div><div class="pn">rtetetet</div><div class="pd">'+p.d+'</div></div></div>'+
      '<div class="pt">'+p.t+'</div>'+(p.img?'<div class="pimg"></div>':'')+
      '<div class="pbar"><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21C5 14.5 3 11 3 8a4.5 4.5 0 018-2.8A4.5 4.5 0 0121 8c0 3-2 6.5-9 13z"/></svg>Thích ('+p.like+')</span><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.5 8.5 0 01-12.4 7.5L3 21l2-5.6A8.5 8.5 0 1121 11.5z"/></svg>Bình luận ('+p.cmt+')</span></div></div>';
  }).join('');

  function fill(id, from, to, val){ var s=document.getElementById(id); for(var i=from;i<=to;i++){ var o=document.createElement('option'); o.value=i; o.textContent=(i<10?'0':'')+i; s.appendChild(o);} s.value=val; }
  fill('acctEdD',1,31,6); fill('acctEdM',1,12,1);
  (function(){ var s=document.getElementById('acctEdY'); for(var y=2010;y>=1970;y--){ var o=document.createElement('option'); o.value=y; o.textContent=y; s.appendChild(o);} s.value=2002; })();

  document.getElementById('acctOverlay').addEventListener('click', function(e){ if(e.target===this) closeAccountModal(); });
  document.getElementById('acctEditOverlay').addEventListener('click', function(e){ if(e.target===this) closeAcctEdit(); });

  window.openAccountModal = function(){ document.getElementById('acctOverlay').classList.add('show'); };
  window.closeAccountModal = function(){ document.getElementById('acctOverlay').classList.remove('show'); };
  window.openAcctEdit = function(){ document.getElementById('acctEditOverlay').classList.add('show'); };
  window.closeAcctEdit = function(){ document.getElementById('acctEditOverlay').classList.remove('show'); };
  window.acctPickG = function(el){ document.querySelectorAll('.acct-edit .gopt').forEach(function(g){ g.classList.remove('sel'); }); el.classList.add('sel'); };
  window.acctSave = function(){
    document.getElementById('acctName').textContent = document.getElementById('acctEdName').value || 'rtetetet';
    document.getElementById('acctGender').textContent = document.querySelector('.acct-edit .gopt.sel').textContent.trim();
    var d=+document.getElementById('acctEdD').value, m=+document.getElementById('acctEdM').value, y=document.getElementById('acctEdY').value;
    document.getElementById('acctDob').textContent = (d<10?'0':'')+d+' tháng '+(m<10?'0':'')+m+', '+y;
    closeAcctEdit();
  };
})();
