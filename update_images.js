const fs = require('fs');
const path = require('path');

const groups = [
    "tay", "thai", "muong", "hmong", "dao",
    "gia-rai", "e-đe", "ba-na", "cham",
    "xo-dang", "san-chay",
    "khmer", "hoa", "nung"
];

const processedDir = path.join(__dirname, 'dan_toc');

groups.forEach(slug => {
    const filePath = path.join(processedDir, `dan-toc-${slug}.html`);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Replace the MAIN banner image
        // The first occurrence of the placeholder is usually the banner
        // We use a specific regex to target the first image or specifically the one inside the banner div if possible
        // But since we know the structure, replacing the first occurrence is safe enough for the main visual improvement.

        // Regex to find the placeholder src
        const placeholder = 'src="https://placehold.co/600x400?text=Anh+Minh+Hoa"';
        const newSrc = `src="../images/${slug}/logo-dan-toc.jpg"`;

        // Replace ONLY the first one (Banner)
        const newContent = content.replace(placeholder, newSrc);

        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent);
            console.log(`Updated images for: ${slug}`);
        } else {
            console.log(`No placeholder found or already updated for: ${slug}`);
        }
    } else {
        console.warn(`File not found: ${filePath}`);
    }
});
