// generate_config.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const apiKey = process.env.API_KEY || "YOUR_API_KEY_PLACEHOLDER";
const content = `export const API_KEY = "${apiKey}";\n`;

const filePath = path.join(__dirname, 'js/config.js');
fs.writeFileSync(filePath, content);
console.log(`Generated js/config.js with API Key from environment.`);
