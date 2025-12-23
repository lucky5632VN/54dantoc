const fs = require('fs');
const path = require('path');

// DANH SÁCH DỮ LIỆU VĂN HÓA CHI TIẾT
const ethnicData = {
    "tay": {
        intro: "Người Tày là dân tộc có dân số đông thứ hai tại Việt Nam, cư trú chủ yếu ở các tỉnh trung du và miền núi phía Bắc. Họ có nền văn hóa đậm đà bản sắc với chữ Nôm Tày và nghệ thuật Then.",
        food: [
            { name: "Khau Nhục", desc: "Món thịt, khoai sọ hầm cách thủy trứ danh." },
            { name: "Xôi Ngũ Sắc", desc: "Năm màu sắc tượng trưng cho ngũ hành." },
            { name: "Bánh Chưng Gù", desc: "Biểu tượng cho lưng người phụ nữ đeo gùi." }
        ],
        costume: {
            title: "Trang Phục Tày",
            desc: "Trang phục cổ truyền của người Tày được làm từ vải bông nhuộm chàm, ít thêu thùa trang trí. Phụ nữ mặc áo dài năm thân, thắt lưng lụa, đeo vòng cổ bạc."
        },
        art: {
            title: "Hát Then & Đàn Tính",
            desc: "Di sản văn hóa phi vật thể của nhân loại. Then là điệu hát thần tiên, cầu an lành, mùa màng bội thu, hòa quyện cùng tiếng đàn Tính tẩu."
        },
        beliefs: {
            title: "Thờ Cúng Tổ Tiên",
            desc: "Bàn thờ tổ tiên đặt ở gian chính, nơi trang trọng nhất. Người Tày rất coi trọng việc hiếu lễ và các ngày giỗ tết."
        }
    },
    "thai": {
        intro: "Người Thái cư trú tập trung ở Tây Bắc, nổi tiếng với kỹ thuật canh tác lúa nước, dệt thổ cẩm tinh xảo và điệu múa Xòe nồng say.",
        food: [
            { name: "Pa Pỉnh Tộp", desc: "Cá nướng gập trứ danh của người Thái." },
            { name: "Cơm Lam", desc: "Gạo nếp nương nướng trong ống tre." },
            { name: "Nộm Da Trâu", desc: "Món ăn dai giòn, đậm vị núi rừng." }
        ],
        costume: {
            title: "Áo Cóm, Khăn Piêu",
            desc: "Phụ nữ Thái duyên dáng trong chiếc áo Cóm bó sát, váy đen và chiếc khăn Piêu thêu tay cầu kỳ - vật tín ước của tình yêu."
        },
        art: {
            title: "Nghệ Thuật Múa Xòe",
            desc: "Biểu tượng của tình đoàn kết cộng đồng. 'Không xòe không vui, không xòe cây lúa không trổ bông'."
        },
        beliefs: {
            title: "Vạn Vật Hữu Linh",
            desc: "Tín ngưỡng đa thần, thờ cúng tổ tiên và thần linh (phi). Lễ hội Xên Bản, Xên Mường cầu mùa màng tốt tươi."
        }
    },
    "muong": {
        intro: "Người Mường cư trú chủ yếu ở Hòa Bình, Thanh Hóa. Họ có chung nguồn gốc với người Kinh và nền văn hóa Hòa Bình nổi tiếng.",
        food: [
            { name: "Cỗ Lá", desc: "Thịt lợn bày trên lá chuối xanh mướt." },
            { name: "Rượu Cần", desc: "Men lá rừng, uống chung thể hiện tình đoàn kết." },
            { name: "Cơm Đồ", desc: "Gạo nếp đồ dẻo thơm ăn cùng muối vừng." }
        ],
        costume: {
            title: "Trang Phục Mường",
            desc: "Nổi bật nhất là chiếc cạp váy dệt hoa văn rồng phượng, hình học tinh tế, thể hiện sự khéo léo của người phụ nữ."
        },
        art: {
            title: "Cồng Chiêng Mường",
            desc: "Không chỉ là nhạc cụ mà còn là vật thiêng, tiếng chiêng âm vang kết nối con người với thần linh và thiên nhiên."
        },
        beliefs: {
            title: "Tín Ngưỡng Đa Thần",
            desc: "Thờ cúng tổ tiên, Thổ công, Vua Bếp. Thầy Mo đóng vai trò quan trọng trong đời sống tâm linh."
        }
    },
    "hmong": {
        intro: "Người H'Mông sống trên các dải núi cao, nổi tiếng với tính cách mạnh mẽ, tự do và kỹ thuật trồng lanh dệt vải, rèn đúc điêu luyện.",
        food: [
            { name: "Mèn Mén", desc: "Cơm ngô xay, món ăn chính nuôi sống người H'Mông." },
            { name: "Thắng Cố", desc: "Món canh thịt ngựa/bò đặc sản phiên chợ vùng cao." },
            { name: "Gà Đen", desc: "Giống gà quý, thịt đen xương đen bổ dưỡng." }
        ],
        costume: {
            title: "Váy Xòe Rực Rỡ",
            desc: "Trang phục sặc sỡ, in sáp ong, thêu hoa văn phức tạp. Váy xòe xếp nếp như những bông hoa rừng di động."
        },
        art: {
            title: "Tiếng Khèn Gọi Bạn",
            desc: "Khèn H'Mông là linh hồn, dùng để tỏ tình, giao duyên và cả trong đám ma để tiễn đưa người chết."
        },
        beliefs: {
            title: "Thờ Cúng Tổ Tiên",
            desc: "Tín ngưỡng thờ cúng đa dạng, đặc biệt quan trọng là lễ cúng ma cửa (xử cang) để bảo vệ gia đình."
        }
    },
    "dao": {
        intro: "Người Dao cư trú xen kẽ với các dân tộc khác, nổi tiếng với tri thức thuốc Nam và nghi lễ Cấp Sắc độc đáo.",
        food: [
            { name: "Thịt Lợn Chua", desc: "Thịt ướp thính, lên men tự nhiên trong chum." },
            { name: "Canh Đắng", desc: "Nấu từ lá phổi bò và lá đắng rừng." },
            { name: "Rượu Hoẵng", desc: "Loại rượu nếp cái ủ men lá đặc biệt." }
        ],
        costume: {
            title: "Trang Phục Người Dao",
            desc: "Đa dạng theo từng nhóm (Dao Đỏ, Dao Tiền...). Phụ nữ Dao Đỏ nổi bật với chiếc khăn đỏ rực rỡ và trang sức bạc."
        },
        art: {
            title: "Lễ Cấp Sắc",
            desc: "Nghi lễ trưởng thành bắt buộc đối với nam giới người Dao, đánh dấu sự công nhận của cộng đồng và thần linh."
        },
        beliefs: {
            title: "Bàn Vương",
            desc: "Tục thờ Bàn Vương (Chó Ngũ Sắc) - thủy tổ của người Dao, là nét tín ngưỡng đặc thù xuyên suốt."
        }
    },
    "khmer": {
        intro: "Người Khmer Nam Bộ có nền văn hóa Phật giáo Nam tông rực rỡ, gắn liền với hệ thống chùa tháp lộng lẫy và các lễ hội lớn.",
        food: [
            { name: "Bún Nước Lèo", desc: "Đậm đà hương vị mắm bò hóc trứ danh." },
            { name: "Cốm Dẹp", desc: "Gạo nếp rang giã dẹp, trộn dừa nạo béo ngậy." },
            { name: "Bánh Tét Trà Cuôn", desc: "Bánh tét ba màu đẹp mắt, nhân đa dạng." }
        ],
        costume: {
            title: "Xăm Pốt, Áo Tầm Vông",
            desc: "Trang phục truyền thống bằng lụa tơ tằm. Xăm pốt (váy quấn) và khăn rằn là nét đặc trưng thường thấy."
        },
        art: {
            title: "Múa Răm Vông & Chùa Tháp",
            desc: "Điệu múa cộng đồng vui tươi. Kiến trúc chùa Khmer mái cong vút, chạm khắc tinh xảo là trung tâm văn hóa."
        },
        beliefs: {
            title: "Phật Giáo Nam Tông",
            desc: "Mọi hoạt động văn hóa, lễ hội (Chol Chnam Thmay, Ok Om Bok) đều gắn liền với ngôi chùa và giáo lý Phật giáo."
        }
    },
    "hoa": {
        intro: "Người Hoa sinh sống lâu đời tại Việt Nam, tập trung nhiều ở các đô thị, có truyền thống kinh doanh giỏi và cộng đồng gắn kết.",
        food: [
            { name: "Vịt Quay", desc: "Da giòn thịt mềm, tẩm ướp gia vị đặc trưng." },
            { name: "Sủi Cảo / Dimsum", desc: "Các món điểm tâm tinh tế, đa dạng nhân." },
            { name: "Mì Vằn Thắn", desc: "Sợi mì dai, nước dùng ngọt thanh từ xương." }
        ],
        costume: {
            title: "Xường Xám (Sườn Xám)",
            desc: "Trang phục tôn dáng phụ nữ với đường xẻ tà quyến rũ. Nam giới thường mặc áo Đường trang trong dịp lễ."
        },
        art: {
            title: "Lân Sư Rồng",
            desc: "Nghệ thuật biểu diễn sôi động cầu may mắn, thịnh vượng trong các dịp lễ tết, khai trương."
        },
        beliefs: {
            title: "Thờ Quan Công, Thiên Hậu",
            desc: "Các hội quán là nơi sinh hoạt văn hóa tâm linh, thờ các vị thần bảo trợ buôn bán và đi biển."
        }
    }
    // Có thể bổ sung thêm các dân tộc khác tại đây
};

const processedDir = path.join(__dirname, 'dan_toc');

// Hàm đọc và thay thế nội dung
function updateContent(slug, data) {
    const filePath = path.join(processedDir, `dan-toc-${slug}.html`);
    if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${filePath}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Update Intro / Title
    content = content.replace(/"(Đặc trưng văn hóa dân tộc .*?)"/g, `"${data.intro}"`);

    // 2. Update Foods
    if (data.food && data.food.length >= 3) {
        // Find placeholders like "Món ăn 1", "Món ăn 2", "Món ăn 3"
        content = content.replace(/>Món ăn 1<\/h3>(.*?)>Đặc sản vùng miền<\/p>/s, `>${data.food[0].name}</h3>$1>${data.food[0].desc}</p>`);
        content = content.replace(/>Món ăn 2<\/h3>(.*?)>Hương vị truyền thống<\/p>/s, `>${data.food[1].name}</h3>$1>${data.food[1].desc}</p>`);
        content = content.replace(/>Món ăn 3<\/h3>(.*?)>Ẩm thực độc đáo<\/p>/s, `>${data.food[2].name}</h3>$1>${data.food[2].desc}</p>`);

        // Also replace placeholder images if they match generic patterns (Optional/Advanced)
        // For now, we rely on the previous step having updated images if available, or manual Image Gen for foods later.
    }

    // 3. Update Costume
    if (data.costume) {
        // Replace Title
        content = content.replace(/<h3 class="text-xl font-bold text-cinnabar">Trang Phục.*?<\/h3>/, `<h3 class="text-xl font-bold text-cinnabar">${data.costume.title}</h3>`);
        // Replace Desc
        content = content.replace(/><strong>.*?<\/strong>.*?Mô tả trang phục truyền thống.*?<\/p>/s, `>${data.costume.desc}</p>`);
    }

    // 4. Update Art
    if (data.art) {
        // Replace Title
        content = content.replace(/<h3 class="text-xl font-bold text-cinnabar">Nghệ thuật.*?<\/h3>/, `<h3 class="text-xl font-bold text-cinnabar">${data.art.title}</h3>`);
        // Replace Desc
        content = content.replace(/>Mô tả nghệ thuật truyền thống.*?<\/p>/, `>${data.art.desc}</p>`);
    }

    // 5. Update Beliefs (Special Section - usually mapped to 'Bảo Vật' section structure in template or 'Tín Ngưỡng' block)
    // The template has a section "Bảo Vật Quốc Gia" which is hardcoded for Drum. Ideally we change this to "Di Sản / Tín Ngưỡng"
    if (data.beliefs) {
        // Change Header "Bảo Vật Quốc Gia" -> "Di Sản Văn Hóa" or Custom Title
        content = content.replace(/Bảo Vật Quốc Gia/g, "Di Sản & Tín Ngưỡng");
        content = content.replace(/"Tiếng trống đồng âm vang ngàn năm lịch sử"/g, `"${data.beliefs.title}"`);

        // Update content inside the 3D/Image block description
        content = content.replace(/<h3 class="text-2xl font-bold text-\[#DAA520\] mb-4">.*?<\/h3>/, `<h3 class="text-2xl font-bold text-[#DAA520] mb-4">${data.beliefs.title}</h3>`);

        // Replace the paragraph content. This is tricky with regex due to multi-line.
        // We look for the general structure.
        const beliefRegex = /<div class="space-y-4 text-sm text-gray-300 leading-relaxed text-justify">[\s\S]*?<\/div>/;
        const newBeliefHTML = `
                        <div class="space-y-4 text-sm text-gray-300 leading-relaxed text-justify">
                            <p>${data.beliefs.desc}</p>
                            <div class="mt-6 p-4 border border-[#DAA520]/30 rounded bg-[#DAA520]/10">
                                <p class="italic text-[#DAA520] text-center">"Bản sắc văn hóa ngàn đời"</p>
                            </div>
                        </div>`;
        content = content.replace(beliefRegex, newBeliefHTML);
    }

    // 6. Cleanup "Nội dung đang cập nhật" pillars if possible, or just leave them if we don't have specific pillar data.
    // Let's assume the pillars (Dao Hieu, Ton Su...) are generic values we want to keep or minimally edit.

    fs.writeFileSync(filePath, content);
    console.log(`Updated content for: ${slug}`);
}

// Chạy script
Object.keys(ethnicData).forEach(slug => {
    updateContent(slug, ethnicData[slug]);
});
