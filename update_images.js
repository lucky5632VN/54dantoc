const fs = require('fs');
const path = require('path');

const groups = [
    "tay", "thai", "muong", "hmong", "dao",
    "gia-rai", "e-de", "ba-na", "cham",
    "xo-dang", "san-chay",
    "khmer", "hoa", "nung"
];

const processedDir = path.join(__dirname, 'dan_toc');

groups.forEach(slug => {
    const filePath = path.join(processedDir, `dan-toc-${slug}.html`);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Replace the MAIN banner image
        // Target the first image which is 800x500 placeholder or similar
        // Or specifically look for the one in the header section

        // Regex to find the banner placeholder
        // Pattern: src="https://placehold.co/800x500?text=[^"]+"
        const bannerRegex = /src="https:\/\/placehold\.co\/800x500\?text=[^"]+"/;
        const newSrc = `src="../images/${slug}/logo-dan-toc.jpg"`;

        // Replace ONLY the first one (Banner)
        const newContent = content.replace(bannerRegex, newSrc);

        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent);
            console.log(`Updated images for: ${slug}`);
        } else {
            console.log(`No banner placeholder found or already updated for: ${slug}`);
        }
    } else {
        console.warn(`File not found: ${filePath}`);
    }
});
