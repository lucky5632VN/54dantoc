// js/chat.js
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import { API_KEY } from './config.js'; // Lấy Key từ file config

// Cấu hình AI
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash",
    systemInstruction: `Vai trò: Bạn là Cụ Đồ, một bậc cao niên uyên bác sống ở làng quê Việt Nam xưa. 
    Tính cách: Trầm ấm, nhân hậu, khiêm tốn, luôn xưng là "lão" hoặc "ta", gọi người dùng là "con". 
    Nhiệm vụ: Trả lời câu hỏi về cuộc sống, đạo đức bằng các câu Ca dao, Tục ngữ, Thành ngữ Việt Nam. 
    Quy tắc: 
    1. Tuyệt đối KHÔNG dùng từ ngữ công nghệ (wifi, internet, app...). 
    2. Luôn trích dẫn ít nhất một câu ca dao/tục ngữ phù hợp trong câu trả lời.`
});

// Biến toàn cục
let chatBody, userInput, sendBtn;

// Hàm khởi tạo (sẽ được gọi từ layout.js)
export function initChatLogic() {
    chatBody = document.getElementById('chat-body');
    userInput = document.getElementById('user-input');
    sendBtn = document.getElementById('send-btn');
    
    // Gắn sự kiện click và enter
    document.getElementById('toggle-chat-btn').addEventListener('click', toggleChat);
    document.getElementById('close-chat-btn').addEventListener('click', toggleChat);
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

// Ẩn hiện chat
function toggleChat() {
    const chatInterface = document.getElementById('chat-interface');
    chatInterface.classList.toggle('chat-hidden');
    if (!chatInterface.classList.contains('chat-hidden')) {
        setTimeout(() => userInput.focus(), 100);
    }
}

// Gửi tin nhắn
async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // UI: Khóa nút
    userInput.disabled = true;
    sendBtn.innerText = "...";
    
    // Hiện tin nhắn user
    addMsg("user", text);
    userInput.value = "";

    // Hiệu ứng đang viết
    const loadingDiv = document.createElement("div");
    loadingDiv.className = "text-gray-400 text-xs italic ml-2 mb-2";
    loadingDiv.innerText = "Cụ Đồ đang suy ngẫm...";
    chatBody.appendChild(loadingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;

    try {
        const result = await model.generateContent(text);
        chatBody.removeChild(loadingDiv);
        addMsg("bot", result.response.text());
    } catch (err) {
        chatBody.removeChild(loadingDiv);
        addMsg("bot", "Lỗi kết nối: " + err.message);
    }

    // UI: Mở khóa
    userInput.disabled = false;
    sendBtn.innerText = "Gửi";
    userInput.focus();
}

// Thêm tin nhắn vào khung
function addMsg(who, text) {
    const div = document.createElement("div");
    if (who === "user") {
        div.className = "flex justify-end";
        div.innerHTML = `<div class="bg-cinnabar text-white px-4 py-2 rounded-l-xl rounded-tr-xl max-w-[85%] text-sm shadow-sm">${text}</div>`;
    } else {
        div.className = "flex justify-start";
        div.innerHTML = `<div class="bg-white border border-gray-200 p-3 rounded-r-xl rounded-bl-xl text-sm text-gray-800 shadow-sm max-w-[90%] prose prose-sm">${marked.parse(text)}</div>`;
    }
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}