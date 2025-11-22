// js/chat.js
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

// API Key setup (Demo purpose)
const API_KEY = "AIzaSyBde4o6VAI29I-et4AThe54YoSDSP-S8CI"; 
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash",
    systemInstruction: `Vai trò: Bạn là Cụ Đồ, một bậc cao niên uyên bác... (Giữ nguyên prompt của bạn)`
});

// DOM Elements (Sẽ được gọi sau khi initLayout chạy)
let chatInterface, userInput, sendBtn, chatBody;

export function initChat() {
    chatInterface = document.getElementById('chat-interface');
    userInput = document.getElementById('user-input');
    sendBtn = document.getElementById('send-btn');
    chatBody = document.getElementById('chat-body');
    
    // Gắn sự kiện
    document.getElementById('toggle-chat-btn').onclick = toggleChat;
    document.getElementById('close-chat-btn').onclick = toggleChat;
    sendBtn.onclick = sendMessage;
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

function toggleChat() {
    chatInterface.classList.toggle('chat-hidden');
    if (!chatInterface.classList.contains('chat-hidden')) {
        setTimeout(() => userInput.focus(), 100);
    }
}

async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // UI Updates
    userInput.disabled = true;
    sendBtn.innerText = "...";
    addMsg("user", text);
    userInput.value = "";

    // Loading state
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

    userInput.disabled = false;
    sendBtn.innerText = "Gửi";
    userInput.focus();
}

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