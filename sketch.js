let numLines = 50;
let mouseIsOverCanvas = false; // 用于控制鼠标是否在画布上方

// ===========================================
// 1. 雨点画布实例 (全屏固定背景)
// ===========================================
new p5(function(p) {
    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight).parent('rain-background-container');
        p.background(0);
    };

    p.draw = function() {
        if (p.width !== p.windowWidth || p.height !== p.windowHeight) {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        }
        
        p.background(0, 50); 
        p.stroke(255, 30, 184, 150); 
        
        for (let i = 0; i < numLines; i = i + 1) {
            let x = p.random(p.width);
            let y1 = p.random(p.height);
            let y2 = y1 + p.random(5, 20); 
            p.line(x, y1, x, y2); 
        }
    };
    
    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
}, 'rainSketch');


// ===========================================
// 2. 主画布实例 (蓝色互动图形，可滚动)
// ===========================================
new p5(function(p) {
    let CANVAS_HEIGHT = 600; // 固定高度
    let lastMouseX = -999; // 存储上次鼠标位置
    let lastMouseY = -999;

    p.setup = function() {
       let canvas = p.createCanvas(p.windowWidth, CANVAS_HEIGHT, p.P2D).parent('main-sketch-container');
        p.background(0, 0); // 完全透明背景
        p.noFill();

        // 鼠标进入/离开事件监听
        canvas.elt.addEventListener('mouseenter', () => mouseIsOverCanvas = true);
        canvas.elt.addEventListener('mouseleave', () => mouseIsOverCanvas = false);
    };

    p.draw = function() {
        if (p.width !== p.windowWidth) {
            p.resizeCanvas(p.windowWidth, CANVAS_HEIGHT);
        }
        
        p.background(0, 0); // 完全透明背景
        p.stroke(25, 25, 255); 
        
        // 只有当鼠标在画布上方时才更新 lastMouseX/Y
        if (mouseIsOverCanvas) {
            lastMouseX = p.mouseX;
            lastMouseY = p.mouseY;
        } 
        
        // 只有当鼠标在画布上方或有上次记录的位置时才绘制
        if (mouseIsOverCanvas || (lastMouseX !== -999 && lastMouseY !== -999)) {
            platonic(p, 50, lastMouseX, lastMouseY);
        }
        
        // 如果鼠标移出且位置有效，停止更新lastMouseX/Y，图形会停在上次位置
        if (!mouseIsOverCanvas && lastMouseX !== -999) {
            // 可以选择清空图形或者让它停留在原地
            // 如果希望图形完全消失，可以在这里设置 lastMouseX = -999;
            // 为了“停止追踪”的效果，我们让它停留在移开时的位置
        }
    };

    function platonic(p, nv, centerX, centerY) {
        let r = 150; 
        p.beginShape(); 
        for (let i = 0; i < nv; i++) {
            let a = i * (2 * Math.PI / nv);
            let pX = p.width / 2 + p.cos(a) * r;
            let pY = p.height / 2 + p.sin(a) * r;
            p.line(centerX, centerY, pX, pY); // 使用传递进来的 centerX, centerY
        }
        p.endShape(p.CLOSE);
    }
}, 'mainSketch');
