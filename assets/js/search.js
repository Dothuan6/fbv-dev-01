var input = document.getElementById('q');
var clearBtn = document.getElementById('clearBtn');
var items = Array.from(document.querySelectorAll('.sr-item'));

function filter(){
  var q = input.value.trim().toLowerCase();
  clearBtn.classList.toggle('show', q.length > 0);
  var visible = 0;
  items.forEach(function(it){
    var match = it.dataset.name.indexOf(q) !== -1;
    it.style.display = match ? '' : 'none';
    if(match) visible++;
  });
  document.getElementById('empty').style.display = (q && visible === 0) ? 'block' : 'none';
}
function clearQ(){ input.value = ''; input.focus(); filter(); }

function addFriend(btn){
  btn.textContent = 'Đã gửi';
  btn.classList.add('sent');
  btn.disabled = true;
}
