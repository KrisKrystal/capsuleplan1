/**
 * 太空房官网 - 交互脚本
 * 特斯拉风格全屏滚动网站
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initHeaderScroll();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initFloatingCTA();
    initParallaxEffect();
    initScrollIndicator();
});

/**
 * 导航栏滚动效果
 * 滚动时改变导航栏样式
 */
function initHeaderScroll() {
    const header = document.getElementById('header');
    const scrollThreshold = 50;
    
    function updateHeader() {
        const scrollY = window.scrollY;
        
        if (scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // 使用 requestAnimationFrame 优化滚动性能
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateHeader();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    // 初始检查
    updateHeader();
}

/**
 * 移动端菜单
 * 汉堡菜单展开/收起
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!menuToggle || !mobileMenu) return;
    
    function toggleMenu() {
        const isOpen = mobileMenu.classList.contains('active');
        
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    function openMenu() {
        mobileMenu.classList.add('active');
        menuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // 菜单打开时强制使用深色文字
        document.getElementById('header').classList.add('scrolled');
    }
    
    function closeMenu() {
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
        
        // 恢复导航栏状态
        if (window.scrollY <= 50) {
            document.getElementById('header').classList.remove('scrolled');
        }
    }
    
    menuToggle.addEventListener('click', toggleMenu);
    
    // 点击导航链接后关闭菜单
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });
    
    // 点击菜单外部关闭菜单
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            closeMenu();
        }
    });
    
    // ESC键关闭菜单
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });
}

/**
 * 平滑滚动
 * 点击导航链接平滑滚动到对应区域
 */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .scroll-indicator');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 56; // 导航栏高度
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * 滚动动画
 * 元素进入视口时的动画效果
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.tech-item, .finance-content, .shop-content, .energy-content, .hydrogen-content');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
                
                // 添加交错动画效果
                if (entry.target.classList.contains('tech-item')) {
                    const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
                
                // 只触发一次动画
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

/**
 * 浮动CTA按钮
 * 滚动到一定位置显示浮动按钮
 */
function initFloatingCTA() {
    const floatingCta = document.getElementById('floatingCta');
    if (!floatingCta) return;
    
    const showThreshold = window.innerHeight * 1.5;
    
    function updateFloatingCta() {
        const scrollY = window.scrollY;
        
        if (scrollY > showThreshold) {
            floatingCta.classList.add('visible');
        } else {
            floatingCta.classList.remove('visible');
        }
    }
    
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateFloatingCta();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/**
 * 视差滚动效果
 * 背景图片随滚动产生视差
 */
function initParallaxEffect() {
    const heroSections = document.querySelectorAll('.hero-section');
    
    // 仅在非触摸设备上启用视差效果
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrollY = window.scrollY;
                
                heroSections.forEach((section, index) => {
                    const rect = section.getBoundingClientRect();
                    const sectionTop = rect.top + scrollY;
                    const sectionHeight = rect.height;
                    
                    // 检查区域是否在视口内
                    if (scrollY + window.innerHeight > sectionTop && 
                        scrollY < sectionTop + sectionHeight) {
                        
                        const relativeScroll = scrollY - sectionTop;
                        const parallaxOffset = relativeScroll * 0.3;
                        
                        section.style.backgroundPositionY = `calc(50% + ${parallaxOffset}px)`;
                    }
                });
                
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/**
 * 滚动指示器
 * 第一个hero区域的滚动提示
 */
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    scrollIndicator.addEventListener('click', function() {
        const nextSection = this.closest('.hero-section').nextElementSibling;
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

/**
 * 按钮点击效果
 * 添加点击波纹动画
 */
document.querySelectorAll('.btn, .nav-link, .mobile-nav-link').forEach(button => {
    button.addEventListener('click', function(e) {
        // 创建波纹元素
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        // 设置波纹位置
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
        ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
        
        // 添加相对定位
        if (getComputedStyle(this).position === 'static') {
            this.style.position = 'relative';
        }
        this.style.overflow = 'hidden';
        
        this.appendChild(ripple);
        
        // 动画结束后移除
        setTimeout(() => ripple.remove(), 600);
    });
});

// 添加波纹动画样式
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

/**
 * 图片懒加载
 * 延迟加载屏幕外的图片
 */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

/**
 * 性能优化：防抖函数
 */
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

/**
 * 性能优化：节流函数
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 页面加载完成后的额外优化
window.addEventListener('load', function() {
    // 添加页面加载完成类
    document.body.classList.add('loaded');
    
    // 预加载下一个区域的背景图
    preloadNextBackground();
});

/**
 * 预加载下一个区域的背景图
 */
function preloadNextBackground() {
    const sections = document.querySelectorAll('.hero-section');
    let currentSectionIndex = 0;
    
    // 找到当前可见的区域
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSectionIndex = index;
        }
    });
    
    // 预加载下两个区域的背景图
    for (let i = 1; i <= 2; i++) {
        const nextSection = sections[currentSectionIndex + i];
        if (nextSection) {
            const bgImage = nextSection.style.backgroundImage;
            if (bgImage) {
                const img = new Image();
                img.src = bgImage.replace(/url\(['"]?([^'"]*)['"]?\)/i, '$1');
            }
        }
    }
}

/**
 * 键盘导航支持
 * 增强可访问性
 */
document.addEventListener('keydown', function(e) {
    // 使用方向键切换区域
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const sections = document.querySelectorAll('.hero-section, .trade-in-section, .tech-section, .finance-section, .shop-section, .energy-section, .hydrogen-section');
        const currentScroll = window.scrollY;
        
        let currentIndex = 0;
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (Math.abs(rect.top) < window.innerHeight / 2) {
                currentIndex = index;
            }
        });
        
        let targetIndex;
        if (e.key === 'ArrowDown') {
            targetIndex = Math.min(currentIndex + 1, sections.length - 1);
        } else {
            targetIndex = Math.max(currentIndex - 1, 0);
        }
        
        sections[targetIndex].scrollIntoView({ behavior: 'smooth' });
        e.preventDefault();
    }
});

// 导出函数供外部使用
window.SpaceHouse = {
    initHeaderScroll,
    initMobileMenu,
    initSmoothScroll,
    initScrollAnimations,
    initFloatingCTA,
    initParallaxEffect,
    debounce,
    throttle
};
