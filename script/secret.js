Comment.Str = {
        /**************************************************************
        *字符串加密
        *   str：需要加密的字符串
        ****************************************************************/
        Encrypt: function (str) {
            var key = CryptoJS.enc.Utf8.parse(aesKey);
            var iv = CryptoJS.enc.Utf8.parse(aesIv);

            var encrypted = '';

            var srcs = CryptoJS.enc.Utf8.parse(str);
            encrypted = CryptoJS.AES.encrypt(srcs, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });

            return encrypted.ciphertext.toString();
        },
        /*
         * 实体加密
         */
        EntityEncrypt:function(param)
        {
            var _data = JSON.stringify(param);
            return this.Encrypt(_data);
        },

        /**************************************************************
        *字符串解密
        *   str：需要解密的字符串
        ****************************************************************/
        Decrypt: function (str) {
            var key = CryptoJS.enc.Utf8.parse(aesKey);
            var iv = CryptoJS.enc.Utf8.parse(aesIv);
            var encryptedHexStr = CryptoJS.enc.Hex.parse(str);
            var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
            var decrypt = CryptoJS.AES.decrypt(srcs, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
            return decryptedStr.toString();
        }
    }
