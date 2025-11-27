let numLines = 50;
let mouseIsOverCanvas = false;

// ===========================================
// 1. 雨点画布实例 (全屏固定背景)
// ===========================================
new p5(function(p) {
    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight).parent('rain-background-container');
        p.background(0); // 初始背景颜色
    };

    p.draw = function() {
        if (p.width !== p.windowWidth || p.height !== p.windowHeight) {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        }
        
        p.background(0, 50); // 带有半透明黑色（alpha=50），实现雨点拖影效果
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
    let lastMouseX = -999; 
    let lastMouseY = -999;
    let ctx; // 用于强制清除画布上下文
    let canvasElement; // 用于存储画布 DOM 元素

    p.setup = function() {
        // 创建画布并强制使用 P2D 渲染模式 (解决叠加问题)
        let canvas = p.createCanvas(p.windowWidth, CANVAS_HEIGHT, p.P2D).parent('main-sketch-container');
        
        // 获取原生画布的上下文，用于强制清除
        ctx = canvas.elt.getContext('2d'); 
        canvasElement = canvas.elt;
        
        p.background(0, 0); // 确保初始背景完全透明
        p.noFill();

        // 鼠标进入/离开事件监听 (桌面端)
        canvasElement.addEventListener('mouseenter', () => mouseIsOverCanvas = true);
        canvasElement.addEventListener('mouseleave', () => mouseIsOverCanvas = false);
    };

    p.draw = function() {
        if (p.width !== p.windowWidth) {
            p.resizeCanvas(p.windowWidth, CANVAS_HEIGHT);
        }
        
        // ********** 强制清除画布 (解决叠加问题) **********
        if (ctx) {
            ctx.clearRect(0, 0, p.width, p.height);
        } else {
             p.background(0, 0); 
        }
        // **********************************************
        
        p.stroke(25, 25, 255); 
        
        // 检查鼠标/触摸是否在画布范围内
        let isOver = p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height;
        mouseIsOverCanvas = isOver; // 更新全局状态
        
        if (mouseIsOverCanvas) {
            lastMouseX = p.mouseX;
            lastMouseY = p.mouseY;
        } 
        
        // 绘制逻辑
        if (mouseIsOverCanvas || (lastMouseX !== -999 && lastMouseY !== -999)) {
            platonic(p, 50, lastMouseX, lastMouseY);
        }
    };
    
    // ********* 触摸事件支持 (手机端) *********
    // 阻止浏览器默认滚动/缩放
    p.touchMoved = function() {
        if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
            // 阻止默认行为，让互动优先
            return false; 
        }
    };
    // ***************************************

    function platonic(p, nv, centerX, centerY) {
        let r = 150; 
        p.beginShape(); 
        for (let i = 0; i < nv; i++) {
            let a = i * (2 * Math.PI / nv);
            let pX = p.width / 2 + p.cos(a) * r;
            let pY = p.height / 2 + p.sin(a) * r;
            p.line(centerX, centerY, pX, pY); 
        }
        p.endShape(p.CLOSE);
    }
}, 'mainSketch');
