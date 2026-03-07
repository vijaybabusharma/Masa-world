import bcrypt from 'bcryptjs';
const hash = bcrypt.hashSync('Masa@masa@vijay123', 10);
console.log(hash);
