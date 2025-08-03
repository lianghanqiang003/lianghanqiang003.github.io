// 优化版赛博朋克特效脚本 - 性能友好

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    
    // 添加基础交互效果
    addBasicInteractions();
    
    // 添加平滑滚动
    addSmoothScrolling();
    
    // 添加懒加载
    addLazyLoading();
    
    // 添加主题切换功能
    addThemeToggle();
    
    console.log('🚀 网站优化完成 - 性能提升版本已加载');
});

// 添加基础交互效果
function addBasicInteractions() {
    // 为卡片添加微妙的悬停效果
    const cards = document.querySelectorAll('.recent-post-info, .glass-container');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // 为链接添加微妙的反馈
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.color = 'var(--primary-cyan)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.color = '';
        });
    });
}

// 添加平滑滚动
function addSmoothScrolling() {
    // 为页面内锚点链接添加平滑滚动
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 添加懒加载
function addLazyLoading() {
    // 使用 Intersection Observer 实现图片懒加载
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// 添加主题切换功能
function addThemeToggle() {
    // 检查用户的主题偏好
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    // 应用主题
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
}

// 添加键盘导航支持
function addKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC 键关闭模态框或返回顶部
        if (e.key === 'Escape') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // 空格键暂停/播放动画（如果有的话）
        if (e.key === ' ' && e.target === document.body) {
            e.preventDefault();
            // 可以在这里添加动画控制逻辑
        }
    });
}

// 性能监控
function performanceMonitoring() {
    // 监控页面加载性能
    window.addEventListener('load', function() {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        if (pageLoadTime > 3000) {
            console.warn('⚠️ 页面加载时间较长:', pageLoadTime + 'ms');
        } else {
            console.log('✅ 页面加载性能良好:', pageLoadTime + 'ms');
        }
    });
}

// 添加滚动指示器
function addScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-cyan), var(--accent-purple));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(indicator);
    
    let ticking = false;
    
    function updateScrollIndicator() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        indicator.style.width = scrollPercent + '%';
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollIndicator);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// 添加简单的搜索功能增强
function enhanceSearch() {
    const searchInput = document.querySelector('input[type="search"]');
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function(e) {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                // 在这里可以添加实时搜索逻辑
                console.log('搜索:', e.target.value);
            }, 300);
        });
    }
}

// 初始化所有增强功能
function initializeEnhancements() {
    addKeyboardNavigation();
    addScrollIndicator();
    enhanceSearch();
    performanceMonitoring();
}

// 在DOM加载完成后初始化增强功能
document.addEventListener('DOMContentLoaded', initializeEnhancements);

// 添加页面可见性检测，优化性能
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面不可见时暂停动画
        document.body.style.animationPlayState = 'paused';
    } else {
        // 页面可见时恢复动画
        document.body.style.animationPlayState = 'running';
    }
});

// 防抖函数工具
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数工具
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 导出工具函数（如果需要的话）
window.BlogUtils = {
    debounce,
    throttle
};