const fs = require('fs');
const path = require('path');

// Danh sách 54 dân tộc
const ethnicGroups = [
    "Kinh", "Tày", "Thái", "Mường", "Khmer", "Hoa", "Nùng", "H'Mông", "Dao", "Gia Rai", 
    "Ê Đê", "Ba Na", "Xơ Đăng", "Sán Chay", "Cơ Ho", "Chăm", "Sán Dìu", "Hrê", "Ra Glai", 
    "Mnông", "X'Tiêng", "Bru-Vân Kiều", "Khơ Mú", "Cơ Tu", "Giáy", "Giẻ Triêng", "Mạ", "Kháng", 
    "Co", "Tà Ôi", "Chơ Ro", "Xinh Mun", "Hà Nhì", "Chu Ru", "Lào", "La Chí", "La Ha", "Phù Lá", 
    "La Hủ", "Lự", "Lô Lô", "Chứt", "Mảng", "Pà Thẻn", "Cờ Lao", "Cống", "Bố Y", "Si La", 
    "Pu Péo", "Brâu", "Ơ Đu", "Rơ Măm"
];

// Hàm chuyển tên thành slug (vd: "Ba Na" -> "ba-na", "H'Mông" -> "h-mong")
function toSlug(name) {
    return name.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/'/g, "")
        .replace(/\s+/g, "-");
}

const templatePath = path.join(__dirname, 'dan_toc/dan-toc-kinh.html');
const outputDir = path.join(__dirname, 'dan_toc');
const imagesDir = path.join(__dirname, 'images');

// Đọc file mẫu
let template = "";
try {
    template = fs.readFileSync(templatePath, 'utf8');
} catch (err) {
    console.error("Không tìm thấy file mẫu Kinh!", err);
    process.exit(1);
}

// Tạo thư mục nếu chưa có
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

ethnicGroups.forEach(name => {
    const slug = toSlug(name);
    // Bỏ qua Kinh vì đã có mẫu, nhưng tạo folder ảnh nếu chưa có
    // User bảo "thêm cả 54... mỗi dân tộc 1 file", nên cứ tạo lại hoặc giữ nguyên Kinh cũng được.
    // Thực tế nếu ghi đè Kinh bằng mẫu của chính nó thì không sao. Hoặc ta skip Kinh để tránh mất dữ liệu gốc nếu template là Kinh.
    // Nhưng để nhất quán code, ta cứ chạy logic tạo folder.
    
    const groupImgDir = path.join(imagesDir, slug);
    if (!fs.existsSync(groupImgDir)) {
        fs.mkdirSync(groupImgDir, { recursive: true });
        console.log(`Đã tạo thư mục ảnh: images/${slug}`);
    }

    if (slug === 'kinh') return; // Skip Kinh file generation to preserve original

    const fileName = `dan-toc-${slug}.html`;
    const filePath = path.join(outputDir, fileName);

    // Thay thế nội dung mẫu
    let content = template
        .replace(/Dân Tộc Kinh/g, `Dân Tộc ${name}`)
        .replace(/kinh\/quan-ho.jpg/g, `${slug}/main.jpg`) // Placeholder path
        .replace(/kinh\/pho.jpg/g, `${slug}/food1.jpg`)
        .replace(/kinh\/banh-chung.jpg/g, `${slug}/food2.jpg`)
        .replace(/kinh\/nuoc-mam.jpg/g, `${slug}/food3.jpg`)
        .replace(/kinh\/ao-ngu-than.jpg/g, `${slug}/costume.jpg`)
        .replace(/kinh\/mua-roi-nuoc.jpg/g, `${slug}/art.jpg`)
        // Thay các text cụ thể của Kinh bằng text chung
        .replace(/"Con Rồng Cháu Tiên - Nền văn minh lúa nước rực rỡ"/g, `"Đặc trưng văn hóa dân tộc ${name}"`)
        .replace(/>Di sản phi vật thể</g, `>Văn hóa đặc sắc<`)
        .replace(/>Dân Ca Quan Họ Bắc Ninh</g, `>Hình ảnh minh họa<`)
        .replace(/Thờ cúng tổ tiên là tín ngưỡng quan trọng nhất.../g, "Nội dung đang cập nhật...")
        .replace(/Tri thức và người thầy luôn được đặt.../g, "Nội dung đang cập nhật...")
        .replace(/"Bán anh em xa, mua láng giềng gần".../g, "Nội dung đang cập nhật...")
        .replace(/>Phở</g, `>Món ăn 1<`)
        .replace(/>Quốc hồn quốc túy.</g, `>Đặc sản vùng miền<`)
        .replace(/>Bánh Chưng</g, `>Món ăn 2<`)
        .replace(/>Linh hồn ngày Tết.</g, `>Hương vị truyền thống<`)
        .replace(/>Nước Mắm</g, `>Món ăn 3<`)
        .replace(/>Gia vị trứ danh.</g, `>Ẩm thực độc đáo<`)
        .replace(/>Áo Ngũ Thân/g, `>Trang phục ${name}<`)
        .replace(/Tiền thân của Áo Dài hiện đại.../g, "Mô tả trang phục truyền thống...")
        .replace(/>Múa Rối Nước</g, `>Nghệ thuật ${name}<`)
        .replace(/Loại hình nghệ thuật độc nhất vô nhị.../g, "Mô tả nghệ thuật truyền thống...")
        // Sketchfab replacement (placeholder or remove?) - Let's keep one generic or remove
        // .replace(/7e38e31e0ac64f43a2035aecfc32f6b2/g, "") // Remove ID specific?
        // Better to replace the Sketchfab iframe with a placeholder image if no ID known, 
        // but for now I will leave it pointing to the drum as a placeholder or comment it out to avoid confusion.
        // Actually, let's keep the drum as a default "Bảo vật VN" shared by all, or replace with a generic text.
        // I'll keep it but change title.
        .replace(/>Trống Đồng Đông Sơn</g, `>Di sản văn hóa<`)
        .replace(/Trống đồng \(tiêu biểu là trống Ngọc Lũ.../g, "Mô tả di sản văn hóa đặc trưng...");

    // Sửa ảnh placeholder để không bị lỗi 404 xấu xí
    content = content.replace(/src="\.\.\/images\/[^"]+"/g, 'src="https://placehold.co/600x400?text=Anh+Minh+Hoa"');
    // Re-fix the specific replacements above which might have been overwritten if I used regex broadly.
    // Actually the regex replace above for paths didn't change the src attribute structure, just the inner path string.
    // Safest is to just replace all `../images/slug/xxx.jpg` with the placeholder URL for now, 
    // OR create dummy images? Creating 54*5 dummy images is too much.
    // I will replace the src with online placeholders for the generated files.

    fs.writeFileSync(filePath, content);
    console.log(`Đã tạo: ${fileName}`);
});
console.log("Hoàn tất tạo 54 trang dân tộc.");
