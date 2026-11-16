const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', '..', 'src', 'lib', 'questions');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

console.log('Generating 50+ questions per banca in', targetDir);
