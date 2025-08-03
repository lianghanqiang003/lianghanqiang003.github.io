// 赛博朋克特效增强脚本

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    
    // 创建动态背景粒子
    createParticleBackground();
    
    // 添加霓虹灯效果
    addNeonEffects();
    
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
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
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

// 霓虹灯效果增强脚本

document.addEventListener('DOMContentLoaded', function() {
    // 添加霓虹灯串元素
    addNeonStrings();
    
    // 为标题添加霓虹招牌效果
    addNeonSignEffects();
    
    // 为导航栏添加霓虹边框效果
    addNeonBorderEffects();
    
    // 为文章卡片添加霓虹光晕效果
    addCardNeonEffects();
    
    // 为按钮添加霓虹脉冲效果
    addButtonNeonEffects();
    
    // 为头像添加旋转霓虹边框
    addAvatarNeonEffects();
    
    // 为链接添加霓虹下划线效果
    addLinkNeonEffects();
    
    // 为滚动条添加霓虹效果
    addScrollbarNeonEffects();
});

// 添加霓虹灯串元素
function addNeonStrings() {
    const body = document.body;
    
    // 创建左侧霓虹灯串
    const leftNeonString = document.createElement('div');
    leftNeonString.className = 'neon-string left';
    body.appendChild(leftNeonString);
    
    // 创建右侧霓虹灯串
    const rightNeonString = document.createElement('div');
    rightNeonString.className = 'neon-string right';
    body.appendChild(rightNeonString);
    
    // 创建顶部霓虹灯条
    const topNeonBar = document.createElement('div');
    topNeonBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, 
            var(--cyberpunk-red) 0%, 
            var(--cyberpunk-pink) 25%, 
            var(--cyberpunk-orange) 50%, 
            var(--cyberpunk-primary) 75%, 
            var(--cyberpunk-secondary) 100%);
        box-shadow: 
            0 0 10px var(--cyberpunk-red),
            0 0 20px var(--cyberpunk-red);
        animation: neon-flicker 2s ease-in-out infinite alternate;
        z-index: 1000;
    `;
    body.appendChild(topNeonBar);
    
    // 创建底部霓虹灯条
    const bottomNeonBar = document.createElement('div');
    bottomNeonBar.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, 
            var(--cyberpunk-secondary) 0%, 
            var(--cyberpunk-primary) 25%, 
            var(--cyberpunk-orange) 50%, 
            var(--cyberpunk-pink) 75%, 
            var(--cyberpunk-red) 100%);
        box-shadow: 
            0 0 10px var(--cyberpunk-red),
            0 0 20px var(--cyberpunk-red);
        animation: neon-flicker 2s ease-in-out infinite alternate;
        z-index: 1000;
    `;
    body.appendChild(bottomNeonBar);
}

// 为标题添加霓虹招牌效果
function addNeonSignEffects() {
    const titles = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    titles.forEach(title => {
        title.classList.add('neon-sign');
        
        // 添加霓虹边框效果
        title.style.position = 'relative';
        title.style.padding = '10px';
        title.style.borderRadius = '5px';
        title.style.border = '1px solid transparent';
        title.style.background = 'rgba(0, 255, 255, 0.05)';
        
        // 添加霓虹边框动画
        setInterval(() => {
            const colors = ['var(--cyberpunk-primary)', 'var(--cyberpunk-secondary)', 'var(--cyberpunk-accent)'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            title.style.borderColor = randomColor;
            title.style.boxShadow = `0 0 10px ${randomColor}, 0 0 20px ${randomColor}`;
        }, 2000);
    });
}

// 为导航栏添加霓虹边框效果
function addNeonBorderEffects() {
    const nav = document.querySelector('#nav');
    if (nav) {
        nav.classList.add('neon-border');
        
        // 为导航项添加霓虹效果
        const navItems = nav.querySelectorAll('.nav-item a');
        navItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.textShadow = `
                    0 0 10px var(--cyberpunk-primary),
                    0 0 20px var(--cyberpunk-primary),
                    0 0 30px var(--cyberpunk-primary)
                `;
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.textShadow = `
                    0 0 5px rgba(0, 255, 255, 0.5),
                    0 0 10px rgba(0, 255, 255, 0.3)
                `;
            });
        });
    }
}

// 为文章卡片添加霓虹光晕效果
function addCardNeonEffects() {
    const cards = document.querySelectorAll('.card-info');
    cards.forEach(card => {
        card.classList.add('neon-border');
        
        // 添加霓虹光晕动画
        setInterval(() => {
            const colors = ['var(--cyberpunk-primary)', 'var(--cyberpunk-secondary)', 'var(--cyberpunk-accent)'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            card.style.boxShadow = `
                0 4px 12px rgba(0, 0, 0, 0.4),
                0 0 30px ${randomColor}40
            `;
        }, 3000);
        
        // 鼠标悬停时的霓虹效果
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = `
                0 8px 25px rgba(0, 0, 0, 0.5),
                0 0 40px var(--cyberpunk-primary),
                0 0 60px var(--cyberpunk-secondary)
            `;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = `
                0 2px 8px rgba(0, 0, 0, 0.3),
                0 0 20px rgba(0, 255, 255, 0.1)
            `;
        });
    });
}

// 为按钮添加霓虹脉冲效果
function addButtonNeonEffects() {
    const buttons = document.querySelectorAll('.btn, button');
    buttons.forEach(button => {
        button.classList.add('neon-border');
        
        // 添加霓虹脉冲动画
        setInterval(() => {
            const colors = ['var(--cyberpunk-primary)', 'var(--cyberpunk-secondary)', 'var(--cyberpunk-accent)'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            button.style.borderColor = randomColor;
            button.style.boxShadow = `
                0 0 15px ${randomColor},
                0 0 25px ${randomColor}80
            `;
        }, 1500);
        
        // 点击时的霓虹爆炸效果
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            this.style.boxShadow = `
                0 0 30px var(--cyberpunk-primary),
                0 0 50px var(--cyberpunk-secondary),
                0 0 70px var(--cyberpunk-accent)
            `;
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// 为头像添加旋转霓虹边框
function addAvatarNeonEffects() {
    const avatar = document.querySelector('#aside-content .avatar-img');
    if (avatar) {
        // 创建旋转霓虹边框
        const neonBorder = document.createElement('div');
        neonBorder.style.cssText = `
            position: absolute;
            top: -5px;
            left: -5px;
            right: -5px;
            bottom: -5px;
            border-radius: 50%;
            background: conic-gradient(
                var(--cyberpunk-primary),
                var(--cyberpunk-secondary),
                var(--cyberpunk-accent),
                var(--cyberpunk-red),
                var(--cyberpunk-primary)
            );
            animation: rotate 3s linear infinite;
            z-index: -1;
        `;
        
        // 添加旋转动画
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        avatar.style.position = 'relative';
        avatar.parentNode.insertBefore(neonBorder, avatar);
    }
}

// 为链接添加霓虹下划线效果
function addLinkNeonEffects() {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.textShadow = `
                0 0 10px var(--cyberpunk-primary),
                0 0 20px var(--cyberpunk-primary),
                0 0 30px var(--cyberpunk-primary)
            `;
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.textShadow = `
                0 0 5px rgba(0, 255, 255, 0.3),
                0 0 10px rgba(0, 255, 255, 0.2)
            `;
        });
    });
}

// 为滚动条添加霓虹效果
function addScrollbarNeonEffects() {
    // 创建自定义滚动条样式
    const style = document.createElement('style');
    style.textContent = `
        ::-webkit-scrollbar {
            width: 12px;
        }
        
        ::-webkit-scrollbar-track {
            background: rgba(10, 10, 10, 0.5);
            border-radius: 6px;
        }
        
        ::-webkit-scrollbar-thumb {
            background: linear-gradient(45deg, 
                var(--cyberpunk-primary), 
                var(--cyberpunk-secondary), 
                var(--cyberpunk-accent));
            border-radius: 6px;
            box-shadow: 
                0 0 10px rgba(0, 255, 255, 0.5),
                0 0 20px rgba(0, 255, 255, 0.3);
            animation: scrollbar-glow 2s ease-in-out infinite alternate;
        }
        
        @keyframes scrollbar-glow {
            0% {
                box-shadow: 
                    0 0 10px rgba(0, 255, 255, 0.5),
                    0 0 20px rgba(0, 255, 255, 0.3);
            }
            100% {
                box-shadow: 
                    0 0 15px rgba(0, 255, 255, 0.8),
                    0 0 25px rgba(0, 255, 255, 0.5);
            }
        }
        
        ::-webkit-scrollbar-thumb:hover {
            box-shadow: 
                0 0 20px rgba(0, 255, 255, 0.8),
                0 0 30px rgba(0, 255, 255, 0.5);
        }
    `;
    document.head.appendChild(style);
}

// 添加霓虹灯招牌文字效果
function addNeonTextEffects() {
    const neonTexts = document.querySelectorAll('.neon-text');
    neonTexts.forEach(text => {
        // 添加霓虹闪烁效果
        setInterval(() => {
            const colors = ['var(--cyberpunk-primary)', 'var(--cyberpunk-secondary)', 'var(--cyberpunk-accent)'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            text.style.color = randomColor;
            text.style.textShadow = `
                0 0 5px ${randomColor},
                0 0 10px ${randomColor},
                0 0 15px ${randomColor},
                0 0 20px ${randomColor}
            `;
        }, 1000);
    });
}

// 添加霓虹灯网格背景
function addNeonGridBackground() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -3;
        opacity: 0.3;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    function drawGrid() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 绘制霓虹网格
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        
        // 垂直线
        for (let x = 0; x < canvas.width; x += 50) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        
        // 水平线
        for (let y = 0; y < canvas.height; y += 50) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
    }
    
    drawGrid();
    
    // 窗口大小改变时重新绘制
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawGrid();
    });
}

// 初始化所有霓虹灯效果
function initNeonEffects() {
    addNeonStrings();
    addNeonSignEffects();
    addNeonBorderEffects();
    addCardNeonEffects();
    addButtonNeonEffects();
    addAvatarNeonEffects();
    addLinkNeonEffects();
    addScrollbarNeonEffects();
    addNeonTextEffects();
    addNeonGridBackground();
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNeonEffects);
} else {
    initNeonEffects();
}