const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'pages');

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.tsx') && file !== 'CaseStudies.tsx') {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Remove imports
    content = content.replace(/^.*import Navbar from.*$/gm, '');
    content = content.replace(/^.*import Footer from.*$/gm, '');
    
    // Remove component tags
    content = content.replace(/<Navbar\s*\/>/g, '');
    content = content.replace(/<Footer\s*\/>/g, '');
    
    // Clean up empty lines left behind
    content = content.replace(/^\s*[\r\n]/gm, '\n');
    
    fs.writeFileSync(filePath, content, 'utf-8');
  }
});
console.log('Cleanup complete');
