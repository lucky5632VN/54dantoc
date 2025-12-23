// js/chat.js
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import { API_KEY } from './config.js';

// Cấu hình AI
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: `
    VAI TRÒ: Bạn là Cụ Đồ, một bậc cao niên uyên bác, hóm hỉnh, am hiểu sâu sắc về 54 dân tộc Việt Nam.
    
    TÍNH CÁCH:
    - Xưng hô: "Lão" hoặc "Ta", gọi người dùng là "con" hoặc "bạn trẻ".
    - Giọng điệu: Trầm ấm, dân dã, hay dùng thành ngữ, ca dao, tục ngữ.
    - Kiến thức: Uyên thâm về văn hóa, lịch sử, phong tục, ẩm thực.

    NHIỆM VỤ:
    1. TRẢ LỜI CÂU HỎI: Giải đáp thắc mắc về văn hóa dựa trên ngữ cảnh trang web người dùng đang xem.
    2. BÓI KIỀU: Chọn ngẫu nhiên câu Kiều và giải nghĩa vận hạn/tình duyên vui vẻ, lạc quan.
    3. ĐỐ VUI: Đưa ra câu đố dân gian. Nếu sai thì gợi ý hài hước. Nếu đúng thì khen ngợi "Khá lắm!".
    4. KỂ CHUYỆN: Kể các tích truyện, huyền thoại về các dân tộc.
    
    LƯU Ý: Tuyệt đối không bịa đặt thông tin sai lệch về văn hóa. Nếu không biết thì nói lái sang chuyện khác hoặc khuyên con tìm hiểu thêm.`
});

let chatBody, userInput, sendBtn;

export function initChatLogic() {
    chatBody = document.getElementById('chat-body');
    userInput = document.getElementById('user-input');
    sendBtn = document.getElementById('send-btn');

    // Gắn sự kiện cơ bản
    document.getElementById('toggle-chat-btn').addEventListener('click', toggleChat);
    document.getElementById('close-chat-btn').addEventListener('click', toggleChat);

    // Sự kiện Gửi tin
    sendBtn.addEventListener('click', () => handleUserMessage());
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserMessage();
    });

    // Sự kiện nút Menu (Reset)
    const menuBtn = document.getElementById('menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            // Tạo tin nhắn bot riêng để tránh xung đột
            const botDiv = document.createElement("div");
            botDiv.className = "flex justify-start mb-4";
            botDiv.innerHTML = `<div class="bg-white border border-gray-200 p-3 rounded-r-xl rounded-bl-xl text-sm text-gray-800 shadow-sm max-w-[90%]">Con muốn đổi trò khác ư? Cứ chọn tự nhiên nhé:</div>`;
            chatBody.appendChild(botDiv);
            showOptions();
            chatBody.scrollTop = chatBody.scrollHeight;
        });
    }

    // Chào mừng lần đầu
    // Tạo tin nhắn chào thủ công để không bị lỗi stream
    const welcomeDiv = document.createElement("div");
    welcomeDiv.className = "flex justify-start mb-4";
    welcomeDiv.innerHTML = `<div class="bg-white border border-gray-200 p-3 rounded-r-xl rounded-bl-xl text-sm text-gray-800 shadow-sm max-w-[90%]">Chào con. Lão là Cụ Đồ. Hôm nay con muốn Lão giúp gì nào?</div>`;
    chatBody.appendChild(welcomeDiv);

    showOptions();
}

// --- HÀM HIỂN THỊ CÁC NÚT CHỌN ---
function showOptions() {
    // Kiểm tra nếu đã có options thì xóa đi để tránh trùng lặp
    const oldOptions = document.getElementById('chat-options');
    if (oldOptions) oldOptions.remove();

    const optionsDiv = document.createElement("div");
    optionsDiv.id = 'chat-options';
    optionsDiv.className = "flex flex-wrap gap-2 mt-2 mb-4 animate-fade-in";

    const options = [
        { text: "🥠 Xin quẻ Bói Kiều", value: "Xin cụ cho con một quẻ bói Kiều xem vận hạn ạ." },
        { text: "🧩 Đố vui dân gian", value: "Cụ đố con một câu đố vui dân gian đi ạ." },
        { text: "📖 Kể chuyện xưa", value: "Cụ kể cho con nghe một tích truyện xưa đi ạ." },
        { text: "🍵 Trò chuyện", value: "Con muốn tâm sự với cụ một chút." }
    ];

    options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "bg-white border border-[#C62828] text-[#C62828] text-xs px-3 py-1.5 rounded-full hover:bg-[#C62828] hover:text-white transition shadow-sm font-bold";
        btn.innerText = opt.text;

        btn.onclick = () => {
            userInput.value = opt.value;
            handleUserMessage();
            optionsDiv.remove(); // Xóa nút sau khi chọn
        };
        optionsDiv.appendChild(btn);
    });

    chatBody.appendChild(optionsDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function toggleChat() {
    const chatInterface = document.getElementById('chat-interface');
    chatInterface.classList.toggle('chat-hidden');
    if (!chatInterface.classList.contains('chat-hidden')) {
        setTimeout(() => userInput.focus(), 100);
    }
}

// --- XỬ LÝ GỬI TIN NHẮN (STREAMING) ---


async function handleUserMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // 1. UI: Khóa nút & Hiện tin nhắn User
    userInput.disabled = true;
    sendBtn.innerText = "...";
    addMsg("user", text);
    userInput.value = "";

    // 2. UI: Tạo sẵn bong bóng tin nhắn của Bot
    const botContainer = document.createElement("div");
    botContainer.className = "flex justify-start mb-4 group relative items-start"; // Modified layout

    const botContent = document.createElement("div");
    botContent.className = "bg-white border border-gray-200 p-3 rounded-r-xl rounded-bl-xl text-sm text-gray-800 shadow-sm max-w-[90%] prose prose-sm";
    botContent.innerHTML = '<span class="italic text-gray-400">Cụ đang suy ngẫm...</span>';



    botContainer.appendChild(botContent);

    chatBody.appendChild(botContainer);
    chatBody.scrollTop = chatBody.scrollHeight;

    // CONTEXT AWARENESS: Lấy thông tin chi tiết hơn từ trang
    const pageTitle = document.title;
    const h1 = document.querySelector('h1')?.innerText || "";
    const metaDesc = document.querySelector('meta[name="description"]')?.content || "";

    // Tóm tắt nội dung chính đang xem (nếu có bài viết)
    let mainContent = "";
    const article = document.querySelector('article') || document.querySelector('main');
    if (article) {
        mainContent = article.innerText.substring(0, 1000).replace(/\s+/g, ' '); // Lấy 1000 ký tự đầu
    }

    const fullPrompt = `
    [THÔNG TIN NGỮ CẢNH]
    - Người dùng đang xem trang: "${pageTitle}"
    - Tiêu đề chính: "${h1}"
    - Tóm tắt nội dung: "${mainContent}..."
    
    [CÂU HỎI CỦA NGƯỜI DÙNG]
    "${text}"
    
    Hãy trả lời với tư cách Cụ Đồ dựa trên thông tin trên (nếu liên quan).
    `;

    try {
        const result = await model.generateContentStream(fullPrompt);
        let fullResponse = "";

        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            fullResponse += chunkText;
            botContent.innerHTML = marked.parse(fullResponse);
            chatBody.scrollTop = chatBody.scrollHeight;
        }



    } catch (err) {
        botContent.innerHTML = `<span class="text-red-600 font-bold">Lỗi: ${err.message}</span>`;
    }

    userInput.disabled = false;
    sendBtn.innerText = "Gửi";
    userInput.focus();
}

// Hàm thêm tin nhắn tĩnh (Dùng cho User)
function addMsg(who, text) {
    const div = document.createElement("div");
    div.className = "flex justify-end mb-4"; // User luôn bên phải
    div.innerHTML = `<div class="bg-cinnabar text-white px-4 py-2 rounded-l-xl rounded-tr-xl max-w-[85%] text-sm shadow-sm">${text}</div>`;

    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}