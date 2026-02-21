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

// Hàm chuyển tên thành slug
function toSlug(name) {
    return name.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d").replace(/Đ/g, "D")
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

    const groupImgDir = path.join(imagesDir, slug);
    if (!fs.existsSync(groupImgDir)) {
        fs.mkdirSync(groupImgDir, { recursive: true });
    }

    if (slug === 'kinh') return; // Skip Kinh

    const fileName = `dan-toc-${slug}.html`;
    const filePath = path.join(outputDir, fileName);

    let content = template;

    // 1. Thay thế Tên Dân Tộc (Title & H1)
    content = content.replace(/Dân Tộc Kinh/g, `Dân Tộc ${name}`);

    // 2. Thay thế Ảnh & Alt text
    // Regex matches: src="../images/kinh/..." alt="..."
    // We replace src with placeholder and alt with generic text

    // Replace Main Image
    content = content.replace(
        /src="\.\.\/images\/kinh\/quan-ho\.jpg" alt="Văn hóa Quan Họ"/g,
        `src="https://placehold.co/800x500?text=${name}" alt="Văn hóa ${name}"`
    );

    // Replace Food Images
    content = content.replace(/src="\.\.\/images\/kinh\/pho\.jpg" alt="Phở Việt Nam"/g, `src="https://placehold.co/400x300?text=Mon+An+1" alt="Món ăn 1"`);
    content = content.replace(/src="\.\.\/images\/kinh\/banh-chung\.jpg" alt="Bánh Chưng"/g, `src="https://placehold.co/400x300?text=Mon+An+2" alt="Món ăn 2"`);
    content = content.replace(/src="\.\.\/images\/kinh\/nuoc-mam\.jpg" alt="Nước Mắm"/g, `src="https://placehold.co/400x300?text=Mon+An+3" alt="Món ăn 3"`);

    // Replace Costume Image
    content = content.replace(
        /src="\.\.\/images\/kinh\/ao-ngu-than\.jpg" alt="Áo Ngũ Thân"/g,
        `src="https://placehold.co/400x600?text=Trang+Phuc" alt="Trang phục ${name}"`
    );

    // Replace Art Image
    content = content.replace(
        /src="\.\.\/images\/kinh\/mua-roi-nuoc\.jpg" alt="Múa Rối Nước"/g,
        `src="https://placehold.co/400x300?text=Nghe+Thuat" alt="Nghệ thuật ${name}"`
    );

    // Replace Religion Image
    content = content.replace(
        /src="\.\.\/images\/kinh\/tin-nguong\.jpg" alt="Tín Ngưỡng Thờ Mẫu"/g,
        `src="https://placehold.co/600x400?text=Tin+Nguong" alt="Tín ngưỡng ${name}"`
    );


    // 3. Thay thế Nội Dung Text
    content = content.replace(/"Con Rồng Cháu Tiên - Nền văn minh lúa nước rực rỡ"/g, `"Đặc trưng văn hóa dân tộc ${name}"`);
    content = content.replace(/>Di sản phi vật thể</g, `>Văn hóa đặc sắc<`);
    content = content.replace(/>Dân Ca Quan Họ Bắc Ninh</g, `>Hình ảnh minh họa<`);

    // Thay thế các đoạn văn mô tả cụ thể của Kinh bằng "Nội dung đang cập nhật..."
    // Sử dụng string cụ thể để tránh lỗi regex "..."

    // Đạo Hiếu
    content = content.replace(
        /Thờ cúng tổ tiên là tín ngưỡng quan trọng nhất.*?<\/p>/s,
        "Nội dung đang cập nhật...</p>"
    );
    // Tôn Sư Trọng Đạo
    content = content.replace(
        /Tri thức và người thầy luôn được đặt ở vị trí trang trọng.*?<\/p>/s,
        "Nội dung đang cập nhật...</p>"
    );
    // Tình Làng Nghĩa Xóm
    content = content.replace(
        /"Bán anh em xa, mua láng giềng gần".*?<\/p>/s,
        "Nội dung đang cập nhật...</p>"
    );

    // Ẩm Thực
    content = content.replace(/>Phở</g, `>Món ăn 1<`);
    content = content.replace(/>Quốc hồn quốc túy.</g, `>Đặc sản vùng miền<`);
    content = content.replace(/>Bánh Chưng</g, `>Món ăn 2<`);
    content = content.replace(/>Linh hồn ngày Tết.</g, `>Hương vị truyền thống<`);
    content = content.replace(/>Nước Mắm</g, `>Món ăn 3<`);
    content = content.replace(/>Gia vị trứ danh.</g, `>Ẩm thực độc đáo<`);

    // Nghệ Thuật & Di Sản
    content = content.replace(/>Áo Ngũ Thân</g, `>Trang phục ${name}<`); // H3
    content = content.replace(/<strong>Áo Ngũ Thân:<\/strong>/g, `<strong>Trang phục ${name}:</strong>`); // Strong tag
    content = content.replace(
        /Tiền thân của Áo Dài hiện đại.*?<\/p>/s,
        "Mô tả trang phục truyền thống...</p>"
    );

    content = content.replace(/>Múa Rối Nước</g, `>Nghệ thuật ${name}<`);
    content = content.replace(
        /Loại hình nghệ thuật độc nhất vô nhị.*?<\/p>/s,
        "Mô tả nghệ thuật truyền thống...</p>"
    );

    // Bảo Vật Quốc Gia -> Di Sản
    content = content.replace(/>Trống Đồng Đông Sơn</g, `>Di sản văn hóa<`);
    content = content.replace(
        /Trống đồng \(tiêu biểu là trống Ngọc Lũ, Hoàng Hạ\).*?<\/p>/s,
        "Mô tả di sản văn hóa đặc trưng...</p>"
    );
    // Remove specific paragraph about drum meaning if present
    content = content.replace(
        /<p><strong class="text-\[#DAA520\]">Ý nghĩa:<\/strong> Mặt trống là hình ảnh mặt trời ở giữa.*?<\/p>/s,
        ""
    );

    // Tín Ngưỡng
    content = content.replace(/>Tín Ngưỡng Thờ Mẫu</g, `>Tín Ngưỡng ${name}<`);
    content = content.replace(/"Tháng Tám giỗ Cha, tháng Ba giỗ Mẹ"/g, `"Tín ngưỡng tâm linh đặc sắc"`);
    content = content.replace(
        /Đạo Mẫu là tín ngưỡng bản địa của người Việt.*?<\/p>/s,
        "Mô tả tín ngưỡng đặc trưng...</p>"
    );

    // Cleanup any remaining specific text if needed

    // Fallback: Nếu ảnh nào đó chưa được replace (do khác biệt nhỏ trong template), replace src generic
    // content = content.replace(/src="\.\.\/images\/[^"]+"/g, 'src="https://placehold.co/600x400?text=Anh+Minh+Hoa"');

    fs.writeFileSync(filePath, content);
    console.log(`Đã tạo: ${fileName}`);
});
console.log("Hoàn tất tạo 54 trang dân tộc.");
