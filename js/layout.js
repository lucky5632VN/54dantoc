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

// 3. HTML cho Footer
const footerHTML = `
<footer class="bg-[#1a1a1a] text-[#F0EAD6] py-12 mt-20 border-t border-[#DAA520]/30 relative overflow-hidden">
    <div class="absolute inset-0 bg-[url('../images/pattern.png')] opacity-5 pointer-events-none"></div>
    <div class="container mx-auto px-6 relative z-10">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
            <div class="md:col-span-2">
                <div class="flex items-center gap-2 mb-4">
                    <span class="text-3xl">⛩️</span>
                    <h2 class="text-2xl font-bold text-[#DAA520] uppercase tracking-widest">Bản Sắc Việt</h2>
                </div>
                <p class="text-gray-400 text-sm leading-relaxed max-w-sm text-justify">
                    Hành trình khám phá vẻ đẹp bất tận của 54 dân tộc anh em. Nơi lưu giữ và lan tỏa những giá trị văn hóa truyền thống quý báu của dân tộc Việt Nam.
                </p>
            </div>

            <div>
                <h3 class="text-lg font-bold text-white mb-4 border-b border-[#C62828] inline-block pb-1">Liên Kết</h3>
                <ul class="space-y-2 text-sm text-gray-400">
                    <li><a href="${rootPath}pages/gioi-thieu.html" class="hover:text-[#DAA520] transition">Về Chúng Tôi</a></li>
                    <li><a href="${rootPath}pages/cac-dan-toc.html" class="hover:text-[#DAA520] transition">Danh Sách Dân Tộc</a></li>
                    <li><a href="${rootPath}pages/bao-tang-3d.html" class="hover:text-[#DAA520] transition">Bảo Tàng Số</a></li>
                    <li><a href="${rootPath}pages/lien-he.html" class="hover:text-[#DAA520] transition">Liên Hệ & Góp Ý</a></li>
                </ul>
            </div>

            <div>
                <h3 class="text-lg font-bold text-white mb-4 border-b border-[#C62828] inline-block pb-1">Kết Nối</h3>
                <ul class="space-y-2 text-sm text-gray-400">
                    <li class="flex items-center gap-2"><span>📧</span> contact@bansacviet.vn</li>
                    <li class="flex items-center gap-2"><span>📞</span> (+84) 123 456 789</li>
                    <li class="flex items-center gap-2"><span>📍</span> Hà Nội, Việt Nam</li>
                </ul>
                <div class="flex gap-4 mt-4">
                    <a href="#" class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1877F2] transition text-white">f</a>
                    <a href="#" class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF0000] transition text-white">Y</a>
                    <a href="#" class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-tr from-yellow-400 to-purple-600 transition text-white">I</a>
                </div>
            </div>
        </div>

        <div class="border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
            <p>&copy; 2024 Bản Sắc Việt. All rights reserved. Designed with ❤️ by Vietnamese.</p>
        </div>
    </div>
</footer>
`;

// 4. HTML cho Chatbot (Cụ Đồ)
const chatHTML = `
<!-- Chat Toggle Button -->
<button id="toggle-chat-btn" class="fixed bottom-6 right-6 z-50 bg-[#C62828] text-white p-4 rounded-full shadow-lg hover:bg-[#B71C1C] transition-all duration-300 hover:scale-110 group animate-bounce-slow">
    <span class="text-2xl">👴</span>
    <span class="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></span>
    <div class="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-gray-800 px-3 py-1 rounded-lg text-xs font-bold shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Hỏi Cụ Đồ
    </div>
</button>

<!-- Chat Interface -->
<div id="chat-interface" class="chat-window chat-hidden fixed bottom-24 right-6 z-50 w-[350px] md:w-[400px] h-[500px] bg-[#FDFBF7] rounded-2xl shadow-2xl border border-[#C62828]/20 flex flex-col overflow-hidden font-sans">
    <!-- Header -->
    <div class="bg-[#C62828] p-4 flex justify-between items-center text-white shadow-md relative overflow-hidden">
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-10"></div>
        <div class="flex items-center gap-3 relative z-10">
            <div class="w-10 h-10 bg-white rounded-full border-2 border-yellow-400 overflow-hidden flex items-center justify-center shadow-inner">
                <span class="text-2xl">👴</span>
            </div>
            <div>
                <h3 class="font-bold text-lg leading-none">Cụ Đồ Thông Thái</h3>
                <span class="text-xs text-yellow-200 opacity-90">● Đang pha trà...</span>
            </div>
        </div>
        <div class="flex gap-2 relative z-10">
            <button id="menu-btn" class="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded transition" title="Menu chức năng">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
            <button id="close-chat-btn" class="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded transition" title="Đóng chat">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </div>

    <!-- Body -->
    <div id="chat-body" class="flex-1 p-4 overflow-y-auto bg-[#F0EAD6]/30 scroll-smooth relative">
        <div class="text-center text-xs text-gray-400 mb-4 italic">Cụ Đồ sử dụng AI để trò chuyện, đôi khi có thể nhầm lẫn.</div>
        <!-- Messages will be injected here -->
    </div>

    <!-- Input Area -->
    <div class="p-3 bg-white border-t border-gray-200">
        <div class="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 border focus-within:border-[#C62828] focus-within:bg-white transition-colors duration-300">
            <input type="text" id="user-input" placeholder="Hỏi cụ về văn hóa..." class="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400">
            <button id="send-btn" class="text-[#C62828] font-bold text-sm hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
            </button>
        </div>
        <div class="text-[10px] text-center text-gray-400 mt-1">Hỗ trợ bởi Google Gemini AI</div>
    </div>
</div>
`;

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
