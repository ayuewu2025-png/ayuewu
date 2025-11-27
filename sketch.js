// 全局变量
let numLines = 50;

function setup() {
  // 创建一个 600x600 的画布
  createCanvas(600, 600);
  background(0);
  // smooth() 在 p5.js 中通常是默认启用的
  stroke(255, 16); // 初始线条颜色和透明度
}

function draw() {
  // 每一帧清空并重新绘制黑色背景
  background(0);
  stroke(25, 25, 255);
  noFill();
  
  // 绘制几何图形，参数固定为 50
  platonic(50);
  
  // 绘制雨点效果
  rain();
}

function rain() {
  stroke(255, 30, 184, 150); // 粉红色，略带透明
  
  for (let i = 0; i < numLines; i = i + 1) {
    let x = random(width);
    let y1 = random(height);
    let y2 = y1 + random(5, 20); // 长度随机
    line(x, y1, x, y2); // 绘制垂直的雨线
  }
}

function platonic(nv) {
  let r = 150; // 半径
  beginShape(); // 开始绘制形状，但在此代码中只用于 line() 的循环

  for (let i = 0; i < nv; i++) {
    // 计算多边形的每个顶点坐标
    let a = i * (2 * PI / nv);
    let pX = width / 2 + cos(a) * r;
    let pY = height / 2 + sin(a) * r;
    
    // 从鼠标位置到多边形顶点的连线
    line(mouseX, mouseY, pX, pY);
  }
  endShape(CLOSE);
}