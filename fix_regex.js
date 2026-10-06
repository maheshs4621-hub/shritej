const fs = require('fs');
function fixFile(file) {
  let s = fs.readFileSync(file, 'utf8');
  s = s.replace(/(\b[a-zA-Z-]+)=([a-zA-Z0-9-_\./\[\]#%:]+)/g, '=" \');
 fs.writeFileSync(file, s, 'utf8');
}
console.log('fix regex ready');
