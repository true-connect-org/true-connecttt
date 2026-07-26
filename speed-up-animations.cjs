const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'pages');

const replaceInFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Speed up GSAP durations
  content = content.replace(/duration:\s*1\.2/g, 'duration: 0.5');
  content = content.replace(/duration:\s*1/g, 'duration: 0.5');
  content = content.replace(/duration:\s*0\.8/g, 'duration: 0.4');
  
  // Speed up stagger times
  content = content.replace(/stagger:\s*0\.15/g, 'stagger: 0.05');
  content = content.replace(/stagger:\s*0\.1/g, 'stagger: 0.05');
  
  // Speed up delays
  content = content.replace(/delay:\s*0\.2/g, 'delay: 0.05');
  
  fs.writeFileSync(filePath, content, 'utf-8');
};

const pages = ['Index.tsx', 'Services.tsx', 'AboutUs.tsx', 'Careers.tsx', 'ContactUs.tsx'];

pages.forEach(file => {
  const filePath = path.join(dir, file);
  if (fs.existsSync(filePath)) {
    replaceInFile(filePath);
    console.log(`Updated ${file}`);
  }
});
