import * as CryptoJS from 'crypto-js';


        const key = `SECRET`;
        //ENCRYPT
        const cipher = CryptoJS.AES.encrypt('Sand@2010',key);
        console.log(cipher.toString());
       
  