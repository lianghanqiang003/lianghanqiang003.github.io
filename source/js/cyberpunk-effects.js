// 赛博朋克特效增强脚本

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    
    // 创建动态背景粒子
    createParticleBackground();
    
    // 添加霓虹灯效果
    addNeonEffects();
    
    // 添加鼠标跟随效果
    addMouseFollowEffect();
    
    // 添加打字机效果
    addTypewriterEffect();
    
    // 添加滚动视差效果
    addParallaxEffect();
});

// 创建动态背景粒子
function createParticleBackground() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-3';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.size = Math.random() * 3 + 1;
            this.color = `hsl(${Math.random() * 60 + 180}, 100%, 50%)`;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    
    // 创建粒子
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // 窗口大小改变时重新设置画布
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// 添加霓虹灯效果
function addNeonEffects() {
    // 为所有标题添加霓虹灯效果
    const titles = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    titles.forEach(title => {
        title.style.textShadow = '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff';
        title.style.animation = 'neonPulse 2s ease-in-out infinite alternate';
    });
    
    // 为链接添加霓虹灯效果
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 10px #00ffff, 0 0 20px #00ffff';
            this.style.color = '#00ffff';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.textShadow = '0 0 5px rgba(0, 255, 255, 0.3)';
            this.style.color = '#00ffff';
        });
    });
}

// 添加鼠标跟随效果
function addMouseFollowEffect() {
    const cursor = document.createElement('div');
    cursor.style.position = 'fixed';
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.borderRadius = '50%';
    cursor.style.background = 'radial-gradient(circle, #00ffff, transparent)';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.transition = 'all 0.1s ease';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // 鼠标悬停时扩大光标
    document.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
    });
}

// 添加打字机效果
function addTypewriterEffect() {
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        typeWriter();
    }
}

// 添加滚动视差效果
function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelectorAll('.glass-container');
        
        parallax.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes neonPulse {
        0% {
            text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff;
        }
        100% {
            text-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff;
        }
    }
    
    @keyframes cyberpunkGlow {
        0%, 100% {
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
        }
        50% {
            box-shadow: 0 0 30px rgba(255, 0, 255, 0.5);
        }
    }
    
    .cyberpunk-glow {
        animation: cyberpunkGlow 2s ease-in-out infinite;
    }
    
    .glass-container {
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
    }
    
    /* 添加扫描线效果 */
    .scan-line {
        position: relative;
        overflow: hidden;
    }
    
    .scan-line::before {
        content: '';
        position: absolute;
        top: -100%;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(transparent, rgba(0, 255, 255, 0.3), transparent);
        animation: scan 3s linear infinite;
    }
    
    @keyframes scan {
        0% {
            top: -100%;
        }
        100% {
            top: 100%;
        }
    }
`;

document.head.appendChild(style);

// 为页面添加扫描线效果
document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('.card-info, #aside-content');
    containers.forEach(container => {
        container.classList.add('scan-line');
    });
});

// 添加键盘特效
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        createRippleEffect(e.clientX, e.clientY);
    }
});

function createRippleEffect(x, y) {
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = '0';
    ripple.style.height = '0';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'radial-gradient(circle, #00ffff, transparent)';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '9998';
    ripple.style.transition = 'all 0.6s ease-out';
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.style.width = '200px';
        ripple.style.height = '200px';
        ripple.style.left = (x - 100) + 'px';
        ripple.style.top = (y - 100) + 'px';
        ripple.style.opacity = '0';
    }, 10);
    
    setTimeout(() => {
        document.body.removeChild(ripple);
    }, 600);
}