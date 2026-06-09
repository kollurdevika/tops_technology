const fs = require('fs');
const path = require('path');

const OLD_URL = 'http://localhost:5000';
const NEW_URL = 'https://yoddhatrader.onrender.com';

function replaceInFile(filePath) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(OLD_URL)) {
      content = content.split(OLD_URL).join(NEW_URL);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  }
}

// Check frontend files
replaceInFile(path.join(__dirname, 'frontend', 'src', 'app', 'admin', 'page.jsx'));
replaceInFile(path.join(__dirname, 'frontend', 'src', 'components', 'Contact.jsx'));
replaceInFile(path.join(__dirname, 'frontend', 'src', 'components', 'Services.jsx'));

console.log("All URLs replaced successfully! You can now run your git commands.");
