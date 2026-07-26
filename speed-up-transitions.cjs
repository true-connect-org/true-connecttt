const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'pages');

const replaceInFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Speed up tailwind transitions
  content = content.replace(/duration-700/g, 'duration-500');
  content = content.replace(/duration-500/g, 'duration-300');
  
  fs.writeFileSync(filePath, content, 'utf-8');
};

const pages = ['Index.tsx', 'Services.tsx', 'AboutUs.tsx', 'Careers.tsx', 'ContactUs.tsx'];

pages.forEach(file => {
  const filePath = path.join(dir, file);
  if (fs.existsSync(filePath)) {
    replaceInFile(filePath);
    console.log(`Updated tailwind transitions in ${file}`);
  }
});
