const se = require('simple-encryptor')(process.env.PASSPHRASE);

function encode(val){
    val = val?.replace(/\//g,'_') 
    return val;
}

function decode(val){
    val = val?.replace(/\_/g,'/') 
    return val;
}


const x = {
    encrypt: val => {
        var result = se.encrypt(val);
        result = encode(result)
        return result;
    },

    decrypt: val => {
        let result = decode(val)
        result = se.decrypt(result);
        return result;
    }
}

module.exports = x