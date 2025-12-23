// js/layout.js
import { initChatLogic } from './chat.js';

// 1. XÁC ĐỊNH ĐƯỜNG DẪN GỐC (CẬP NHẬT MỚI)
const path = window.location.pathname;
let rootPath = "./";

// Nếu file đang chạy nằm trong thư mục 'pages' HOẶC 'dan_toc'
// Thì phải lùi ra 1 cấp (../) để về thư mục gốc
if (path.includes("/pages/") || path.includes("/dan_toc/")) {
    rootPath = "../";
}

// 2. HTML cho Navbar
const navHTML = `
<nav class="fixed top-0 w-full z-40 px-6 py-4 flex justify-between items-center bg-[#F0EAD6]/90 backdrop-blur-sm border-b border-[#C62828]/20 shadow-sm transition-all duration-300" id="main-nav">
    <div class="flex items-center gap-2">
        <span class="text-3xl">⛩️</span>
        <a href="${rootPath}index.html" class="text-2xl font-bold text-cinnabar tracking-widest uppercase hover:opacity-80">Bản Sắc Việt</a>
    </div>
    
    <!-- Desktop Menu -->
    <ul class="hidden md:flex gap-8 font-medium text-gray-700">
        <li><a href="${rootPath}index.html" class="nav-link">Trang Chủ</a></li>
        <li><a href="${rootPath}pages/gioi-thieu.html" class="nav-link">Giới Thiệu</a></li>
        <li><a href="${rootPath}pages/cac-dan-toc.html" class="nav-link">Các Dân Tộc</a></li>
        <li><a href="${rootPath}pages/ban-do.html" class="nav-link">Bản Đồ</a></li>
        <li><a href="${rootPath}pages/bao-tang-3d.html" class="nav-link font-bold text-cinnabar">Bảo Tàng 3D</a></li>
        <li><a href="${rootPath}pages/blog.html" class="nav-link">Blog</a></li>
        <li><a href="${rootPath}pages/lien-he.html" class="nav-link">Liên Hệ</a></li>
    </ul>

    <!-- Mobile Button -->
    <button id="mobile-menu-btn" class="md:hidden text-2xl text-cinnabar focus:outline-none">☰</button>
</nav>

<!-- Mobile Menu Overlay -->
<div id="mobile-menu" class="fixed inset-0 z-50 bg-[#F0EAD6] transform translate-x-full transition-transform duration-300 flex flex-col justify-center items-center gap-8 md:hidden">
    <button id="close-mobile-menu-btn" class="absolute top-6 right-6 text-4xl text-cinnabar">&times;</button>
    <a href="${rootPath}index.html" class="text-2xl font-bold text-gray-800 hover:text-cinnabar">Trang Chủ</a>
    <a href="${rootPath}pages/gioi-thieu.html" class="text-2xl font-bold text-gray-800 hover:text-cinnabar">Giới Thiệu</a>
    <a href="${rootPath}pages/cac-dan-toc.html" class="text-2xl font-bold text-gray-800 hover:text-cinnabar">Các Dân Tộc</a>
    <a href="${rootPath}pages/ban-do.html" class="text-2xl font-bold text-gray-800 hover:text-cinnabar">Bản Đồ</a>
    <a href="${rootPath}pages/bao-tang-3d.html" class="text-2xl font-bold text-cinnabar">Bảo Tàng 3D</a>
    <a href="${rootPath}pages/blog.html" class="text-2xl font-bold text-gray-800 hover:text-cinnabar">Blog</a>
    <a href="${rootPath}pages/lien-he.html" class="text-2xl font-bold text-gray-800 hover:text-cinnabar">Liên Hệ</a>
</div>
`;

// ... (Footer & Chat HTML kept same) ...

// 5. Hàm khởi tạo (Render và Kích hoạt)
function initLayout() {
    // A. Vẽ giao diện
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);
    document.body.insertAdjacentHTML('beforeend', chatHTML);

    // B. Highlight Link đang xem & Mobile Menu Logic
    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    // Highlight
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href').includes(currentPath)) link.classList.add('active');
    });

    // Mobile Menu Events
    const mobileMenu = document.getElementById('mobile-menu');
    const openBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-mobile-menu-btn');

    if (openBtn && mobileMenu && closeBtn) {
        openBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
        });
        closeBtn.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
        });
        // Click link thì đóng menu
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.add('translate-x-full'));
        });
    }

    // C. Kích hoạt Chatbot
    initChatLogic();
}

// Tự động chạy
initLayout();