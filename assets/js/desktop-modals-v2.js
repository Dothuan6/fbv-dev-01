/* Modal dùng chung cho desktop shell: Cài đặt (2 cột) · Thêm bạn · Tạo nhóm · Mã QR · Profile bạn bè.
   Nhúng: <script src="assets/js/desktop-modals-v2.js"> */
(function(){
  var x = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>';

  /* ---------- Nội dung các mục Cài đặt ---------- */
  var SET = {
    general:
      '<div class="set-sec"><h4>Giao diện và ngôn ngữ</h4>'+
        '<div class="set-card">'+
          '<div class="set-row"><span class="lbl">Thay đổi kiểu chữ</span><select><option>Mặc định</option><option>Inter</option><option>Roboto</option></select></div>'+
          '<div class="set-row"><span class="lbl">Thay đổi ngôn ngữ</span><select><option>Tiếng Việt</option><option>Tiếng Anh</option></select></div>'+
        '</div></div>',
    privacy:
      '<div class="set-sec"><h4>Quyền riêng tư</h4><div class="desc">Chọn ai có thể xem thông tin cá nhân của bạn</div>'+
        '<div class="set-card">'+
          '<div class="set-row"><span class="lbl">Số điện thoại</span><select id="pvPhone"><option>Công khai</option><option selected>Bạn bè</option><option>Chỉ mình tôi</option></select></div>'+
          '<div class="set-row"><span class="lbl">Email</span><select id="pvEmail"><option>Công khai</option><option selected>Bạn bè</option><option>Chỉ mình tôi</option></select></div>'+
          '<div class="set-row"><span class="lbl">Ngày sinh</span><select id="pvDob"><option selected>Đầy đủ</option><option>Chỉ ngày/tháng</option><option>Chỉ mình tôi</option></select></div>'+
        '</div></div>'+
      '<div class="set-sec"><div class="set-card">'+
          '<div class="set-row"><button class="set-btn" style="color:var(--primary);font-weight:700" onclick="savePrivacy()">Lưu thay đổi</button></div>'+
        '</div></div>',
    account:
      '<div class="set-sec"><h4>Tài khoản và bảo mật</h4>'+
        '<div class="set-card">'+
          '<div class="set-row"><span class="lbl">Cập nhật thông tin cá nhân</span><span class="link" onclick="closeSettingsModal();openAccountModal&&openAccountModal()">Chỉnh sửa ›</span></div>'+
          '<div class="set-row"><span class="lbl">Cập nhật mật khẩu</span><span class="link" onclick="if(confirm(\'Gửi liên kết đặt lại mật khẩu đến email của bạn?\')) location.href=\'reset-link.html\'">Đổi ›</span></div>'+
        '</div></div>'+
      '<div class="set-sec">'+
        '<div class="set-card">'+
          '<div class="set-row"><button class="set-btn danger" onclick="if(confirm(\'Đăng xuất khỏi thiết bị này?\')) location.href=\'welcome.html\'">Đăng xuất</button></div>'+
          '<div class="set-row"><button class="set-btn danger" onclick="if(confirm(\'Xóa tài khoản sẽ xóa toàn bộ dữ liệu và không thể hoàn tác. Tiếp tục?\')) location.href=\'welcome.html\'">Xóa tài khoản</button></div>'+
        '</div></div>',
    about:
      '<div class="set-sec"><h4>Thông tin về Chatting App</h4>'+
        '<div class="set-card"><div class="set-row"><span class="lbl" style="color:var(--text-secondary)">Chatting App giúp bạn giữ liên lạc, trò chuyện và quản lý tài khoản dễ dàng trong một không gian an toàn.</span></div></div></div>'+
      '<div class="set-sec"><div class="set-card">'+
          '<div class="set-row"><span class="lbl">Phiên bản</span><span style="font-weight:600">1.3.8 + 40</span></div>'+
          '<div class="set-row"><span class="lbl">Điều khoản</span><span class="link" onclick="location.href=\'terms.html\'">›</span></div>'+
          '<div class="set-row"><span class="lbl">Chính sách quyền riêng tư</span><span class="link" onclick="location.href=\'privacy.html\'">›</span></div>'+
          '<div class="set-row"><span class="lbl">Hỗ trợ</span><span class="link" onclick="location.href=\'support.html\'">›</span></div>'+
        '</div></div>'
  };
  var MENU = [
    {k:'general', t:'Cài đặt chung', ic:'<circle cx="12" cy="12" r="3"/><path d="M19.4 13a7.9 7.9 0 000-2l2-1.5-2-3.4-2.3 1a8 8 0 00-1.7-1l-.3-2.6h-4l-.3 2.6a8 8 0 00-1.7 1l-2.3-1-2 3.4L4.6 11a7.9 7.9 0 000 2l-2 1.5 2 3.4 2.3-1a8 8 0 001.7 1l.3 2.6h4l.3-2.6a8 8 0 001.7-1l2.3 1 2-3.4z"/>'},
    {k:'privacy', t:'Quyền riêng tư', ic:'<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0"/>'},
    {k:'account', t:'Tài khoản và bảo mật', ic:'<path d="M12 2l8 3v6c0 5-3.4 8.7-8 11-4.6-2.3-8-6-8-11V5z"/>'},
    {k:'about', t:'Thông tin về Chatting App', ic:'<circle cx="12" cy="12" r="9"/><line x1="12" y1="11" x2="12" y2="16"/><circle cx="12" cy="8" r="0.6"/>'}
  ];

  var sw = document.createElement('div');
  sw.innerHTML =
    '<div class="set-overlay" id="setOverlay"><div class="set-modal">'+
      '<div class="set-head"><h3>Cài đặt</h3><button class="x" onclick="closeSettingsModal()">'+x+'</button></div>'+
      '<div class="set-body"><div class="set-menu" id="setMenu"></div><div class="set-content" id="setContent"></div></div>'+
    '</div></div>'+
    '<div class="af-overlay" id="afOverlay"><div class="af-modal">'+
      '<div class="af-head"><h3>Thêm bạn</h3><button class="x" onclick="closeAddFriendModal()">'+x+'</button></div>'+
      '<div class="af-body">'+
        '<div class="af-phone"><span class="af-cc">🇻🇳 (+84) ▾</span><input placeholder="Số điện thoại" /></div>'+
        '<div class="af-sugg-t"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6"/></svg> Có thể bạn quen</div>'+
        '<div id="afSugg"></div>'+
        '<div class="af-qr" onclick="closeAddFriendModal();openQRModal()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><line x1="14" y1="14" x2="14" y2="21"/><line x1="18" y1="14" x2="18" y2="18"/><line x1="21" y1="17" x2="21" y2="21"/></svg> Mã QR của tôi</div>'+
      '</div>'+
      '<div class="af-foot"><button class="cancel" onclick="closeAddFriendModal()">Hủy</button><button class="ok">Tìm kiếm</button></div>'+
    '</div></div>'+
    /* Tạo nhóm */
    '<div class="cg-overlay" id="cgOverlay"><div class="cg-modal">'+
      '<div class="cg-head"><h3>Tạo nhóm</h3><button class="x" onclick="closeCreateGroupModal()">'+x+'</button></div>'+
      '<div class="cg-body">'+
        '<div class="cg-name"><span class="cam"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h3l1.5-2h5L16 8h3a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2z"/><circle cx="12" cy="13" r="3"/></svg></span><input id="cgNameInput" placeholder="Nhập tên nhóm..." oninput="cgValidate()" /></div>'+
        '<div class="cg-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg><input placeholder="Nhập tên, số điện thoại" oninput="cgFilter(this.value)" /></div>'+
        '<div class="cg-recent">Trò chuyện gần đây</div>'+
        '<div class="cg-list" id="cgList"></div>'+
      '</div>'+
      '<div class="cg-foot"><button class="cancel" onclick="closeCreateGroupModal()">Hủy</button><button class="ok" id="cgOk" disabled onclick="closeCreateGroupModal()">Tạo nhóm</button></div>'+
    '</div></div>'+
    /* Thêm thành viên vào nhóm */
    '<div class="cg-overlay" id="amOverlay"><div class="cg-modal">'+
      '<div class="cg-head"><h3>Thêm thành viên</h3><button class="x" onclick="closeAddMemberModal()">'+x+'</button></div>'+
      '<div class="cg-body">'+
        '<div class="cg-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg><input placeholder="Nhập tên, số điện thoại" oninput="amFilter(this.value)" /></div>'+
        '<div class="cg-recent">Gợi ý</div>'+
        '<div class="cg-list" id="amList"></div>'+
      '</div>'+
      '<div class="cg-foot"><button class="cancel" onclick="closeAddMemberModal()">Hủy</button><button class="ok" id="amOk" disabled onclick="doAddMember()">Thêm</button></div>'+
    '</div></div>'+
    /* Mã QR */
    '<div class="qr-overlay" id="qrOverlay"><div class="qr-modal">'+
      '<div class="qr-head"><h3>Mã QR của tôi</h3><button class="x" onclick="closeQRModal()">'+x+'</button></div>'+
      '<div class="qr-card"><div class="uname">@yase0</div><div class="qr-box"><canvas id="qrCanvas" width="220" height="220"></canvas></div><div class="cap">Quét mã để thêm bạn với tôi</div></div>'+
    '</div></div>'+
    /* Profile bạn bè */
    '<div class="fr-overlay" id="frOverlay"><div class="fr-modal">'+
      '<div class="fr-head"><h3>Thông tin tài khoản</h3><button class="x" onclick="closeFriendModal()">'+x+'</button></div>'+
      '<div class="fr-scroll">'+
      '<div class="fr-cover"></div>'+
      '<div class="fr-avrow"><div class="fr-av" id="frAv">R</div></div>'+
      '<div class="fr-name"><div class="nm" id="frName">rtetetet</div><div class="hd" id="frHandle">@rtetetet</div></div>'+
      '<div class="fr-actions">'+
        '<button id="frMsg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.5 8.5 0 01-12.4 7.5L3 21l2-5.6A8.5 8.5 0 1121 11.5z"/></svg>Nhắn tin</button>'+
        '<button id="frCall"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 4c.5 0 1 .3 1.2.8l1.2 2.8c.2.5.1 1-.3 1.4l-1.3 1.3c1 2 2.6 3.6 4.6 4.6l1.3-1.3c.4-.4.9-.5 1.4-.3l2.8 1.2c.5.2.8.7.8 1.2v2.8c0 .8-.7 1.5-1.5 1.4C9.6 19.6 4.4 14.4 4 6.5 3.9 5.7 4.6 5 5.4 5z"/></svg>Gọi thoại</button>'+
        '<button id="frVideo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3z"/></svg>Gọi video</button>'+
      '</div>'+
      '<div class="fr-sec"><h4>Thông tin cá nhân</h4>'+
        '<div class="fr-irow"><div class="l">Giới tính</div><div class="v" id="frGender">Nam</div></div>'+
        '<div class="fr-irow"><div class="l">Ngày sinh</div><div class="v" id="frDob">08/12/2005</div></div>'+
        '<div class="fr-irow"><div class="l">Điện thoại</div><div class="v" id="frPhone">+84 912 223 336</div></div>'+
        '<div class="fr-irow"><div class="l">Email</div><div class="v" id="frEmail">account001@deltajohnsons.com</div></div>'+
      '</div>'+
      '<div class="fr-posts"><h4>Bài viết</h4><div id="frPosts"></div></div>'+
      '</div>'+  /* /fr-scroll */
      '<div class="fr-foot"><button onclick="if(confirm(\'Huỷ kết bạn với người này?\')) closeFriendModal()">Huỷ kết bạn</button><button onclick="if(confirm(\'Chặn người này?\')) closeFriendModal()">Chặn</button></div>'+
    '</div></div>';
  document.body.appendChild(sw);

  // Menu cài đặt
  var menu = document.getElementById('setMenu');
  MENU.forEach(function(m,i){
    var el=document.createElement('div'); el.className='it'+(i===0?' active':''); el.dataset.k=m.k;
    el.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+m.ic+'</svg>'+m.t;
    el.onclick=function(){ document.querySelectorAll('#setMenu .it').forEach(function(n){n.classList.remove('active');}); el.classList.add('active'); document.getElementById('setContent').innerHTML=SET[m.k]; };
    menu.appendChild(el);
  });
  document.getElementById('setContent').innerHTML = SET.general;

  // Lưu quyền riêng tư
  window.savePrivacy=function(){
    if(window.showToast) showToast('Cập nhật quyền riêng tư thành công');
    else alert('Cập nhật quyền riêng tư thành công');
  };

  // Gợi ý thêm bạn
  var C={rn:'linear-gradient(135deg,#F5C543,#9B6BF0)',leaf:'linear-gradient(135deg,#1FB6D6,#1877F2)',land:'linear-gradient(135deg,#4FA8F5,#16A085)',gray:'#5B6470'};
  var sugg=[{n:'Anh Khoa Doan',av:'AK',c:C.leaf},{n:'Diệp',av:'D',c:C.rn},{n:'Hm Khôi',av:'H',c:C.land}];
  document.getElementById('afSugg').innerHTML = sugg.map(function(p){
    return '<div class="af-s"><div class="av" style="background:'+p.c+'">'+p.av+'</div><div class="mid"><div class="nm">'+p.n+'</div><div class="sub">Từ gợi ý kết bạn</div></div><button class="af-add" onclick="this.textContent=\'Đã gửi\';this.classList.add(\'done\');this.disabled=true">Kết bạn</button></div>';
  }).join('');

  // Danh sách trò chuyện gần đây cho Tạo nhóm
  var recent=[{n:'Hà Sam',av:'H',c:C.land},{n:'Bé Ngọc',av:'B',c:C.rn},{n:'Cơm Gà Mì Trộn',av:'C',c:C.gray},{n:'account001',av:'200',c:'linear-gradient(135deg,#3A1C5A,#7B2FF7)'},{n:'Change name55',av:'C',c:C.leaf},{n:'rtetetet',av:'R',c:C.gray}];
  function renderCg(filter){
    document.getElementById('cgList').innerHTML = recent.filter(function(p){ return !filter || p.n.toLowerCase().indexOf(filter.toLowerCase())>-1; }).map(function(p){
      return '<label class="cg-item"><input type="checkbox" onchange="cgValidate()"><div class="av" style="background:'+p.c+'">'+p.av+'</div><span class="nm">'+p.n+'</span></label>';
    }).join('');
  }
  renderCg('');
  window.cgFilter=function(v){ renderCg(v); };
  window.cgValidate=function(){
    var hasName=document.getElementById('cgNameInput').value.trim().length>0;
    var picked=document.querySelectorAll('#cgList input:checked').length>0;
    document.getElementById('cgOk').disabled = !(hasName && picked);
  };

  // Danh sách gợi ý cho "Thêm thành viên" (bạn bè chưa ở trong nhóm)
  function renderAm(filter){
    document.getElementById('amList').innerHTML = recent.filter(function(p){ return !filter || p.n.toLowerCase().indexOf(filter.toLowerCase())>-1; }).map(function(p){
      return '<label class="cg-item"><input type="checkbox" onchange="amValidate()"><div class="av" style="background:'+p.c+'">'+p.av+'</div><span class="nm">'+p.n+'</span></label>';
    }).join('');
  }
  renderAm('');
  window.amFilter=function(v){ renderAm(v); };
  window.amValidate=function(){
    document.getElementById('amOk').disabled = document.querySelectorAll('#amList input:checked').length===0;
  };
  window.doAddMember=function(){
    var n = document.querySelectorAll('#amList input:checked').length;
    closeAddMemberModal();
    if(window.showToast) showToast('Đã thêm '+n+' thành viên vào nhóm');
    if(typeof window.onMembersAdded==='function'){
      var names=[]; document.querySelectorAll('#amList input:checked').forEach(function(i){ names.push(i.parentNode.querySelector('.nm').textContent); });
      window.onMembersAdded(names);
    }
  };

  // Vẽ mã QR (trang trí)
  function drawQR(){
    var c=document.getElementById('qrCanvas'), ctx=c.getContext('2d'), N=25, cell=c.width/N;
    ctx.fillStyle='#fff'; ctx.fillRect(0,0,c.width,c.height); ctx.fillStyle='#0B1622';
    function inF(r,col){ return (r<8&&col<8)||(r<8&&col>=N-8)||(r>=N-8&&col<8); }
    function fin(r0,c0){ for(var i=0;i<7;i++)for(var j=0;j<7;j++){ if(i===0||i===6||j===0||j===6) ctx.fillRect((c0+j)*cell,(r0+i)*cell,cell,cell); } for(var i2=2;i2<5;i2++)for(var j2=2;j2<5;j2++) ctx.fillRect((c0+j2)*cell,(r0+i2)*cell,cell,cell); }
    for(var r=0;r<N;r++)for(var col=0;col<N;col++){ if(inF(r,col))continue; if(Math.random()<0.46) ctx.fillRect(col*cell,r*cell,cell,cell); }
    fin(0,0); fin(0,N-7); fin(N-7,0);
  }
  var qrDrawn=false;

  document.getElementById('setOverlay').addEventListener('click', function(e){ if(e.target===this) closeSettingsModal(); });
  document.getElementById('afOverlay').addEventListener('click', function(e){ if(e.target===this) closeAddFriendModal(); });
  document.getElementById('cgOverlay').addEventListener('click', function(e){ if(e.target===this) closeCreateGroupModal(); });
  document.getElementById('amOverlay').addEventListener('click', function(e){ if(e.target===this) closeAddMemberModal(); });
  document.getElementById('qrOverlay').addEventListener('click', function(e){ if(e.target===this) closeQRModal(); });
  document.getElementById('frOverlay').addEventListener('click', function(e){ if(e.target===this) closeFriendModal(); });

  window.openFriendModal=function(f){
    f = f || {};
    var name = f.name || 'Người dùng';
    document.getElementById('frName').textContent = name;
    document.getElementById('frHandle').textContent = f.handle || ('@'+name.toLowerCase().replace(/\s+/g,''));
    var avEl=document.getElementById('frAv'); avEl.textContent=f.av||name[0]; avEl.style.background=f.color||'#5B6470';
    document.getElementById('frGender').textContent = f.gender || 'Nam';
    document.getElementById('frDob').textContent = f.dob || '08/12/2005';
    document.getElementById('frPhone').textContent = f.phone || '+84 912 223 336';
    document.getElementById('frEmail').textContent = f.email || (name.toLowerCase().replace(/\s+/g,'')+'@deltajohnsons.com');

    // Bài viết của người này
    var av=f.av||name[0], col=f.color||'#5B6470';
    var posts = f.posts || [
      {t:'Hôm nay trời đẹp quá 🌤️', d:'2 giờ trước', img:true, like:12, cmt:3},
      {t:'Xin chào mọi người, đây là tài khoản mới của mình.', d:'29/04/2026', img:false, like:4, cmt:7}
    ];
    document.getElementById('frPosts').innerHTML = posts.length ? posts.map(function(p){
      return '<div class="fr-post"><div class="ph"><div class="pa" style="background:'+col+'">'+av+'</div><div><div class="pn">'+name+'</div><div class="pd">'+p.d+'</div></div></div>'+
        '<div class="pt">'+p.t+'</div>'+(p.img?'<div class="pimg"></div>':'')+
        '<div class="pbar"><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21C5 14.5 3 11 3 8a4.5 4.5 0 018-2.8A4.5 4.5 0 0121 8c0 3-2 6.5-9 13z"/></svg>Thích ('+p.like+')</span><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.5 8.5 0 01-12.4 7.5L3 21l2-5.6A8.5 8.5 0 1121 11.5z"/></svg>Bình luận ('+p.cmt+')</span></div></div>';
    }).join('') : '<div class="fr-empty2">Chưa có bài viết</div>';

    document.getElementById('frMsg').onclick=function(){ location.href='app.html'; };
    document.getElementById('frCall').onclick=function(){ location.href='call.html?type=voice&name='+encodeURIComponent(name); };
    document.getElementById('frVideo').onclick=function(){ location.href='call.html?type=video&name='+encodeURIComponent(name); };
    document.getElementById('frOverlay').classList.add('show');
  };
  window.closeFriendModal=function(){ document.getElementById('frOverlay').classList.remove('show'); };

  window.openCreateGroupModal=function(){ document.getElementById('cgOverlay').classList.add('show'); };
  window.closeCreateGroupModal=function(){ document.getElementById('cgOverlay').classList.remove('show'); };
  window.openAddMemberModal=function(){
    renderAm(''); document.getElementById('amOk').disabled=true;
    document.getElementById('amOverlay').classList.add('show');
  };
  window.closeAddMemberModal=function(){ document.getElementById('amOverlay').classList.remove('show'); };
  window.openQRModal=function(){ if(!qrDrawn){ drawQR(); qrDrawn=true; } document.getElementById('qrOverlay').classList.add('show'); };
  window.closeQRModal=function(){ document.getElementById('qrOverlay').classList.remove('show'); };

  window.openSettingsModal=function(){ document.getElementById('setOverlay').classList.add('show'); };
  window.closeSettingsModal=function(){ document.getElementById('setOverlay').classList.remove('show'); };
  window.openAddFriendModal=function(){ document.getElementById('afOverlay').classList.add('show'); };
  window.closeAddFriendModal=function(){ document.getElementById('afOverlay').classList.remove('show'); };
})();
