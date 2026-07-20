// Màn rộng dùng bản desktop bản tin
function goDesktopIfWide(){ if(window.innerWidth >= 1024) location.replace('app-feed.html'); }
goDesktopIfWide();
window.addEventListener('resize', goDesktopIfWide);

function openSheet(id){
  document.getElementById('overlay').classList.add('show');
  document.getElementById(id).classList.add('show');
}
function closeSheet(){
  document.getElementById('overlay').classList.remove('show');
  document.querySelectorAll('.sheet').forEach(function(s){ s.classList.remove('show'); });
}

// Tuỳ chọn bài đăng — kèm thông báo thành công
function editPostPrivacy(){ closeSheet(); showToast('Cập nhật quyền riêng tư thành công'); }
function editPost(){ closeSheet(); showToast('Sửa bài đăng thành công'); }
function deletePost(){
  closeSheet();
  var post = document.querySelector('.post');   // demo: xoá bài đầu tiên
  if(post) post.remove();
  showToast('Xóa bài đăng thành công');
}
