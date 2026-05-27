// 太空房设计页面交互逻辑

// 价格配置
const PRICES = {
    // 基础价格
    base: 288000,
    
    // 版本价格
    versions: {
        standard: 288000,
        deluxe: 328000,
        premium: 388000
    },
    
    // 颜色价格
    colors: {
        white: 0,
        gray: 8000,
        blue: 8000,
        black: 8000,
        red: 12000,
        green: 12000
    },
    
    // 门窗配置价格
    doorwindow: {
        standard: 0,
        panoramic: 15000,
        sliding: 12000
    },
    
    // 阳台配置价格
    balcony: {
        none: 0,
        front: 28000,
        side: 28000,
        wrap: 45000
    },
    
    // 内饰价格
    interior: {
        modern: 0,
        nordic: 15000,
        luxury: 28000
    },
    
    // 附加选项价格
    addons: {
        solar: 35000,
        hydrogen: 58000,
        smart: 18000,
        security: 12000
    }
};

// 当前配置状态
let currentConfig = {
    version: 'standard',
    color: 'white',
    doorwindow: 'standard',
    balcony: 'none',
    interior: 'modern',
    addons: []
};

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initVersionSelection();
    initColorSelection();
    initDoorWindowSelection();
    initBalconySelection();
    initInteriorSelection();
    initAddonSelection();
    initPriceToggle();
    initPromoBanner();
    initImageControls();
    updatePrice();
});

// 户型版本选择
function initVersionSelection() {
    const versionCards = document.querySelectorAll('.version-card');
    
    versionCards.forEach(card => {
        card.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            
            // 更新选中状态
            versionCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // 更新配置
            currentConfig.version = this.dataset.version;
            
            // 更新价格显示
            updatePrice();
            
            // 添加动画效果
            animateSelection(this);
        });
    });
}

// 颜色选择
function initColorSelection() {
    const colorBtns = document.querySelectorAll('.color-btn');
    const colorNameEl = document.getElementById('colorName');
    
    colorBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 更新选中状态
            colorBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 更新配置
            currentConfig.color = this.dataset.color;
            
            // 更新颜色名称显示
            colorNameEl.textContent = this.dataset.colorName;
            
            // 更新价格
            updatePrice();
            
            // 添加动画效果
            animateSelection(this);
            
            // 更新产品图片（模拟）
            updateProductImage();
        });
    });
}

// 门窗配置选择
function initDoorWindowSelection() {
    const optionCards = document.querySelectorAll('.doorwindow-options .option-card');
    const doorWindowNameEl = document.getElementById('doorWindowName');
    
    optionCards.forEach(card => {
        card.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            
            // 更新选中状态
            optionCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // 更新配置
            currentConfig.doorwindow = this.dataset.doorwindow;
            
            // 更新名称显示
            const nameEl = this.querySelector('.option-name');
            doorWindowNameEl.textContent = nameEl.textContent;
            
            // 更新价格
            updatePrice();
            
            // 添加动画效果
            animateSelection(this);
        });
    });
}

// 阳台配置选择
function initBalconySelection() {
    const optionCards = document.querySelectorAll('.balcony-options .option-card');
    const balconyNameEl = document.getElementById('balconyName');
    
    optionCards.forEach(card => {
        card.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            
            // 更新选中状态
            optionCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // 更新配置
            currentConfig.balcony = this.dataset.balcony;
            
            // 更新名称显示
            const nameEl = this.querySelector('.option-name');
            balconyNameEl.textContent = nameEl.textContent;
            
            // 更新价格
            updatePrice();
            
            // 添加动画效果
            animateSelection(this);
            
            // 更新产品图片（模拟）
            updateProductImage();
        });
    });
}

// 内饰选择
function initInteriorSelection() {
    const interiorBtns = document.querySelectorAll('.interior-btn');
    const interiorNameEl = document.getElementById('interiorName');
    
    interiorBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 更新选中状态
            interiorBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 更新配置
            currentConfig.interior = this.dataset.interior;
            
            // 更新内饰名称显示
            interiorNameEl.textContent = this.dataset.interiorName;
            
            // 更新价格
            updatePrice();
            
            // 添加动画效果
            animateSelection(this);
        });
    });
}

// 附加选项选择
function initAddonSelection() {
    const addonCheckboxes = document.querySelectorAll('.addon-checkbox');
    
    addonCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const addon = this.dataset.addon;
            
            if (this.checked) {
                currentConfig.addons.push(addon);
            } else {
                currentConfig.addons = currentConfig.addons.filter(a => a !== addon);
            }
            
            // 更新价格
            updatePrice();
            
            // 添加动画效果
            const addonItem = this.closest('.addon-item');
            animateSelection(addonItem);
        });
    });
}

// 价格切换展开/收起
function initPriceToggle() {
    const priceToggle = document.getElementById('priceToggle');
    const priceDetails = document.getElementById('priceDetails');
    
    priceToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        priceDetails.classList.toggle('active');
    });
}

// 促销横幅关闭
function initPromoBanner() {
    const promoBanner = document.querySelector('.promo-banner');
    const promoClose = document.querySelector('.promo-close');
    
    if (promoClose && promoBanner) {
        promoClose.addEventListener('click', function() {
            promoBanner.style.display = 'none';
        });
    }
}

// 图片视角切换
function initImageControls() {
    const imageBtns = document.querySelectorAll('.image-btn');
    const productImage = document.getElementById('productImage');
    
    // 不同视角的图片URL
    const imageViews = {
        front: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80',
        side: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200&q=80',
        back: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200&q=80'
    };
    
    imageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.dataset.view;
            
            // 更新按钮状态
            imageBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 切换图片（带淡入淡出效果）
            productImage.style.opacity = '0';
            setTimeout(() => {
                productImage.src = imageViews[view];
                productImage.style.opacity = '1';
            }, 200);
        });
    });
}

// 更新价格
function updatePrice() {
    // 计算基础价格
    let basePrice = PRICES.versions[currentConfig.version];
    
    // 计算选装配置价格
    let optionsPrice = 0;
    optionsPrice += PRICES.colors[currentConfig.color];
    optionsPrice += PRICES.doorwindow[currentConfig.doorwindow];
    optionsPrice += PRICES.balcony[currentConfig.balcony];
    optionsPrice += PRICES.interior[currentConfig.interior];
    
    // 附加选项价格
    let addonsPrice = 0;
    currentConfig.addons.forEach(addon => {
        addonsPrice += PRICES.addons[addon];
    });
    
    optionsPrice += addonsPrice;
    
    // 总价
    const totalPrice = basePrice + optionsPrice;
    
    // 月供计算（假设5年贷款，年利率3%）
    const monthlyPayment = calculateMonthlyPayment(totalPrice, 5, 0.03);
    
    // 更新显示
    updatePriceDisplay(basePrice, optionsPrice, totalPrice, monthlyPayment);
}

// 计算月供
function calculateMonthlyPayment(principal, years, annualRate) {
    const monthlyRate = annualRate / 12;
    const numPayments = years * 12;
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    return Math.round(monthlyPayment);
}

// 更新价格显示
function updatePriceDisplay(basePrice, optionsPrice, totalPrice, monthlyPayment) {
    // 格式化价格
    const formatPrice = (price) => '¥' + price.toLocaleString('zh-CN');
    
    // 更新配置面板中的价格
    document.getElementById('basePriceDisplay').textContent = formatPrice(basePrice);
    
    const optionsPriceRow = document.getElementById('optionsPriceRow');
    if (optionsPrice > 0) {
        optionsPriceRow.style.display = 'flex';
        document.getElementById('optionsPrice').textContent = formatPrice(optionsPrice);
    } else {
        optionsPriceRow.style.display = 'none';
    }
    
    document.getElementById('totalPrice').textContent = formatPrice(totalPrice);
    
    // 更新底部价格栏
    document.getElementById('monthlyPrice').textContent = formatPrice(monthlyPayment) + ' /月';
    document.getElementById('totalPriceSmall').textContent = '房屋价格 ' + formatPrice(totalPrice);
    
    // 更新价格详情
    document.getElementById('detailBasePrice').textContent = formatPrice(basePrice);
    
    const detailOptionsRow = document.getElementById('detailOptionsRow');
    if (optionsPrice > 0) {
        detailOptionsRow.style.display = 'flex';
        document.getElementById('detailOptionsPrice').textContent = formatPrice(optionsPrice);
    } else {
        detailOptionsRow.style.display = 'none';
    }
    
    document.getElementById('detailTotalPrice').textContent = formatPrice(totalPrice);
}

// 更新产品图片（根据颜色和阳台配置）
function updateProductImage() {
    const productImage = document.getElementById('productImage');
    
    // 这里可以根据不同配置加载不同的图片
    // 目前使用简单的透明度动画来模拟变化
    productImage.style.opacity = '0.8';
    setTimeout(() => {
        productImage.style.opacity = '1';
    }, 200);
}

// 选中动画效果
function animateSelection(element) {
    element.style.transform = 'scale(0.98)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 150);
}

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 监听滚动事件，更新导航栏样式
let lastScrollY = window.scrollY;
const header = document.getElementById('header');

window.addEventListener('scroll', function() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScrollY = currentScrollY;
}, { passive: true });

// 配置变化时的提示
function showConfigChangeNotification(configName) {
    // 可以在这里添加配置变化的提示动画
    console.log(`配置已更新: ${configName}`);
}

// 导出配置（用于下单）
function exportConfiguration() {
    return {
        ...currentConfig,
        timestamp: new Date().toISOString(),
        totalPrice: calculateTotalPrice()
    };
}

// 计算总价
function calculateTotalPrice() {
    let total = PRICES.versions[currentConfig.version];
    total += PRICES.colors[currentConfig.color];
    total += PRICES.doorwindow[currentConfig.doorwindow];
    total += PRICES.balcony[currentConfig.balcony];
    total += PRICES.interior[currentConfig.interior];
    currentConfig.addons.forEach(addon => {
        total += PRICES.addons[addon];
    });
    return total;
}

// 立即下单按钮事件
document.querySelector('.order-btn').addEventListener('click', function() {
    const config = exportConfiguration();
    console.log('提交配置:', config);
    
    // 这里可以添加跳转到订单确认页面的逻辑
    alert('配置已保存！即将跳转到订单确认页面...\n\n总价: ¥' + config.totalPrice.toLocaleString('zh-CN'));
});
