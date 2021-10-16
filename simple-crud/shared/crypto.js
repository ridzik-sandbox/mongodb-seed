/* 
Encrypt: Uses crypto-js to encrypt a string
Decrypt: Uses crypto-js to decrypt a string
*/

const dotenv = require("dotenv").config();
const CryptoJS = require("crypto-js");

const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
    encrypt: (param) => {
        return CryptoJS.AES.encrypt(JSON.stringify(param), SECRET_KEY).toString();
    },
    decrypt: (param) => {
        const decryptedString = CryptoJS.AES.decrypt(param, SECRET_KEY);
        return decryptedString.toString(CryptoJS.enc.Utf8).replace(/['"]+/g, '');
    }
 }