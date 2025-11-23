// js/layout.js
import { initChatLogic } from './chat.js'; // <--- IMPORT LOGIC TỪ CHAT.JS

// 1. Xác định đường dẫn gốc
const isPageFolder = window.location.pathname.includes("/pages/");
const rootPath = isPageFolder ? "../" : "./";

// 2. HTML cho Navbar
const navHTML = `
<nav class="fixed top-0 w-full z-40 px-6 py-4 flex justify-between items-center bg-[#F0EAD6]/90 backdrop-blur-sm border-b border-[#C62828]/20 shadow-sm transition-all duration-300" id="main-nav">
    <div class="flex items-center gap-2">
        <span class="text-3xl">⛩️</span>
        <a href="${rootPath}index.html" class="text-2xl font-bold text-cinnabar tracking-widest uppercase hover:opacity-80">Bản Sắc Việt</a>
    </div>
    <ul class="hidden md:flex gap-8 font-medium text-gray-700">
        <li><a href="${rootPath}index.html" class="nav-link">Trang Chủ</a></li>
        <li><a href="${rootPath}pages/gioi-thieu.html" class="nav-link">Giới Thiệu</a></li>
        <li><a href="${rootPath}pages/cac-dan-toc.html" class="nav-link">Các Dân Tộc</a></li>
        <li><a href="${rootPath}pages/ban-do.html" class="nav-link">Bản Đồ</a></li>
        <li><a href="${rootPath}pages/blog.html" class="nav-link">Blog</a></li>
        <li><a href="${rootPath}pages/lien-he.html" class="nav-link">Liên Hệ</a></li>
    </ul>
    <button class="md:hidden text-2xl text-cinnabar">☰</button>
</nav>
`;

// 3. HTML cho Footer
const footerHTML = `
<footer class="bg-[#1a1a1a] text-gray-400 py-8 text-center border-t border-gray-700 mt-auto">
    <p class="mb-2 font-serif">&copy; 2025 Bản Sắc Việt. Bảo lưu mọi quyền.</p>
    <div class="text-sm">
        <a href="#" class="hover:text-white transition mx-2">Chính sách</a> | 
        <a href="#" class="hover:text-white transition mx-2">Điều khoản</a>
    </div>
</footer>
`;

// 4. HTML cho Chat Widget
const chatHTML = `
<div class="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
    <div id="chat-interface" class="chat-window chat-hidden bg-[#FDFBF7] w-[350px] h-[450px] shadow-2xl border border-gray-300 rounded-xl flex flex-col overflow-hidden mb-4">
        <div class="bg-cinnabar text-[#F0EAD6] p-4 flex items-center justify-between shadow-md">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-[#F0EAD6] rounded-full flex items-center justify-center border-2 border-gray-800 text-2xl">👴</div>
                <div><h3 class="font-bold text-base font-serif">Cụ Đồ AI</h3></div>
            </div>
            <button id="close-chat-btn" class="hover:bg-red-800 p-1 rounded text-white transition">✕</button>
        </div>
        <div class="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50" id="chat-body">
            <div class="bg-white border border-gray-200 p-3 rounded-r-xl rounded-bl-xl text-sm text-gray-800 shadow-sm max-w-[90%]">
                Chào con. Lão là Cụ Đồ. Con có chuyện gì trăn trở về văn hóa nước Nam ta, cứ kể lão nghe.
            </div>
        </div>
        <div class="p-3 border-t border-gray-200 bg-white flex gap-2">
            <input type="text" id="user-input" placeholder="Hỏi cụ một câu..." class="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-cinnabar focus:outline-none">
            <button id="send-btn" class="bg-cinnabar hover:bg-red-800 text-white px-4 py-2 rounded-full text-sm transition font-bold">Gửi</button>
        </div>
    </div>
    <button id="toggle-chat-btn" class="group bg-cinnabar text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 border-4 border-[#F0EAD6]">
        <span class="text-3xl group-hover:rotate-12 transition-transform">📜</span>
    </button>
</div>
<div class="paper-texture"></div>
`;

// 5. Hàm khởi tạo (Render và Kích hoạt)
function initLayout() {
    // A. Vẽ giao diện (Menu, Footer, Chat)
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);
    document.body.insertAdjacentHTML('beforeend', chatHTML);

    // B. Highlight Link đang xem
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        if(link.getAttribute('href').includes(currentPath)) {
            link.classList.add('active');
        }
    });

    // C. Kích hoạt logic Chatbot <--- QUAN TRỌNG
    initChatLogic();
}

// Tự động chạy khi file này được import
initLayout();