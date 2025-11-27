// 全局变量
let numLines = 50;

function setup() {
  // 保持画布宽度铺满，高度固定为 600px，与 CSS 中的高度保持一致
  createCanvas(windowWidth, 600); 
  background(0);
  stroke(255, 16); 
}

function draw() {
  // 每次窗口大小变化时，重新设置画布尺寸以保持全宽
  if (width !== windowWidth) {
    resizeCanvas(windowWidth, 600);
  }
  
  background(0);
  stroke(25, 25, 255); // 蓝色的几何图形
  noFill();
  
  platonic(50);
 // rain(); // 粉色的雨
}



function platonic(nv) {
  let r = 150; 
  beginShape(); 

  for (let i = 0; i < nv; i++) {
    let a = i * (2 * PI / nv);
    let pX = width / 2 + cos(a) * r;
    let pY = height / 2 + sin(a) * r;
    
    // 从鼠标位置到多边形顶点的连线
    line(mouseX, mouseY, pX, pY);
  }
  endShape(CLOSE);
}
