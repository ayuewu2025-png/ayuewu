let numLines = 100;

// ===========================================
// 1. 雨点画布实例 (全屏固定背景)
// ===========================================
new p5(function(p) {
    p.setup = function() {
        // 创建雨点画布，并附加到 #rain-background-container
        p.createCanvas(p.windowWidth, p.windowHeight).parent('rain-background-container');
        p.background(0，0); // 初始黑色背景
    };

    p.draw = function() {
        // 每次窗口大小变化时调整画布尺寸
        if (p.width !== p.windowWidth || p.height !== p.windowHeight) {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        }
        
        p.background(0, 50); // 带有半透明黑色，实现雨点拖影效果
        p.stroke(255, 30, 184, 150); // 粉红色，略带透明
        
        for (let i = 0; i < numLines; i = i + 1) {
            let x = p.random(p.width);
            let y1 = p.random(p.height);
            let y2 = y1 + p.random(5, 20); // 长度随机
            p.line(x, y1, x, y2); // 绘制垂直的雨线
        }
    };
    
    // 确保雨点画布尺寸跟随窗口变化
    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
}, 'rainSketch'); // 给这个实例一个名字，虽然这里用不到


// ===========================================
// 2. 主画布实例 (蓝色互动图形，可滚动)
// ===========================================
new p5(function(p) {
    let CANVAS_HEIGHT = 600; // 固定高度

    p.setup = function() {
        // 创建主画布，并附加到 #main-sketch-container
        p.createCanvas(p.windowWidth, CANVAS_HEIGHT).parent('main-sketch-container');
        p.background(0); // 主画布初始背景
        p.noFill();
    };

    p.draw = function() {
        // 每次窗口大小变化时调整画布宽度
        if (p.width !== p.windowWidth) {
            p.resizeCanvas(p.windowWidth, CANVAS_HEIGHT);
        }
        
        p.background(0); // 每次清空并重新绘制黑色背景
        p.stroke(25, 25, 255); // 蓝色的线条
        
        platonic(p, 50);
    };

    // platonic 函数现在接受 p 作为参数，以便在正确的实例上绘图
    function platonic(p, nv) {
        let r = 150; 
        p.beginShape(); 
        for (let i = 0; i < nv; i++) {
            let a = i * (2 * Math.PI / nv);
            let pX = p.width / 2 + p.cos(a) * r;
            let pY = p.height / 2 + p.sin(a) * r;
            // 鼠标交互只在这个画布范围内有效
            p.line(p.mouseX, p.mouseY, pX, pY);
        }
        p.endShape(p.CLOSE);
    }

    // 主画布不需要 windowResized，因为它高度固定
    // 并且宽度变化通过 draw 循环中的 resizeCanvas 处理
}, 'mainSketch'); // 给这个实例一个名字
