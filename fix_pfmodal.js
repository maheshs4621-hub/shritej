const fs = require('fs');
let s = fs.readFileSync('src/components/ProductFormModal.tsx', 'utf8');
s = s.replace(/placeholder=([^ >]+)/g, 'placeholder=" \');
s = s.replace(/className=([^ >]+)/g, 'className=\\');
fs.writeFileSync('src/components/ProductFormModal.tsx', s, 'utf8');
console.log('ProductFormModal regex fixed');