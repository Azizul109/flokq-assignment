// generate-secret.js
const crypto = require('crypto');

// Generate a random 64-character hex string
const jwtSecret = crypto.randomBytes(64).toString('hex');
console.log('Your JWT Secret Key:');
console.log(jwtSecret);
console.log('\n📋 Copy this key and add it to your .env file as:');
console.log(`JWT_SECRET=${jwtSecret}`);