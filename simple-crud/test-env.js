/* 
Script demos utilizing dotenv and a script using crypto-js.
It pulls in env vars that were originally encrypted using crypto-js.
Decrypts those vars
Consoles out the key/values
Then uses crypto-js to encrypt them again
And consoles out the key/values which should match the original values decrypted
*/

const dotenv = require("dotenv").config();
const crypto = require("./shared/crypto");
 
const config = {
    un: process.env.MONGODB_USER,
    pw: process.env.MONGODB_PW,
    cluster: process.env.MONGODB_CLUSTER,
    db: process.env.MONGODB_DB
};

let encryptedConfig = {};
let decryptedConfig = {};

console.log('\nStart Decrypting config');
for (let key in config) {
    decryptedConfig[key] = crypto.decrypt(config[key]);
    console.log(`Encrypted Config Value: ${config[key]} - Decrypted to: ${key.toUpperCase()}: ${crypto.decrypt(config[key])}`);
}
console.log('Finish Decrypting config\n\nDecrypted Config: ', decryptedConfig);

console.log('\nStart Encrypting config');
for (let key in decryptedConfig) {
    encryptedConfig[key] = crypto.encrypt(decryptedConfig[key]);
    console.log(`Decrypted Config Value: ${decryptedConfig[key]} - Encrypted to: ${key.toUpperCase()}: ${encryptedConfig[key]}`);
}
console.log('\nEncrypted Config: ', encryptedConfig);
console.log('\n\nStop reading encrypted config\nDone!!');