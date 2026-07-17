// Vẽ mã QR trang trí (mô phỏng) lên canvas
(function(){
  var c = document.getElementById('qr'), ctx = c.getContext('2d');
  var N = 25, cell = c.width / N;
  ctx.fillStyle = '#fff'; ctx.fillRect(0,0,c.width,c.height);
  ctx.fillStyle = '#0B1622';

  function finder(r0, c0){
    // 7x7 đen, 5x5 trắng, 3x3 đen
    for(var i=0;i<7;i++)for(var j=0;j<7;j++){ if(i===0||i===6||j===0||j===6) cell_fill(r0+i,c0+j); }
    for(var i=2;i<5;i++)for(var j=2;j<5;j++) cell_fill(r0+i,c0+j);
  }
  function cell_fill(r,col){ ctx.fillRect(col*cell, r*cell, cell, cell); }
  function inFinder(r,col){
    return (r<8&&col<8) || (r<8&&col>=N-8) || (r>=N-8&&col<8);
  }
  // module ngẫu nhiên
  for(var r=0;r<N;r++)for(var col=0;col<N;col++){
    if(inFinder(r,col)) continue;
    if(Math.random() < 0.46) cell_fill(r,col);
  }
  finder(0,0); finder(0,N-7); finder(N-7,0);
})();
