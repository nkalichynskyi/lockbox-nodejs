// Generated by CoffeeScript 1.6.3
/*
This file is part of the Lockbox package.

Copyright © 2013 Erin Millard

For the full copyright and license information, please view the LICENSE
file that was distributed with this source code.
*/


(function() {
  var EncryptionCipher;

  module.exports = EncryptionCipher = (function() {
    function EncryptionCipher(crypto) {
      if (crypto == null) {
        crypto = require('crypto');
      }
      this._crypto = crypto;
    }

    EncryptionCipher.prototype.encrypt = function(key, data) {
      var digest, encryptedData, encryptedKeyAndIv, generatedKey, hash, iv;
      generatedKey = this._generateKey();
      iv = this._generateIv();
      encryptedKeyAndIv = key.encrypt(generatedKey + iv, 'binary', 'binary');
      hash = this._crypto.createHash('sha1');
      hash.update(data);
      digest = hash.digest('binary');
      encryptedData = this._encryptAes(generatedKey, iv, digest + data);
      return this._base64UriEncode(encryptedKeyAndIv + encryptedData);
    };

    EncryptionCipher.prototype._generateKey = function() {
      return this._crypto.randomBytes(32);
    };

    EncryptionCipher.prototype._generateIv = function() {
      return this._crypto.randomBytes(16);
    };

    EncryptionCipher.prototype._encryptAes = function(key, iv, data) {
      var cipher, encrypted;
      cipher = this._crypto.createCipheriv('aes-256-cbc', key, iv);
      encrypted = cipher.update(data, 'binary', 'binary');
      return encrypted += cipher.final('binary');
    };

    EncryptionCipher.prototype._base64UriEncode = function(data) {
      data = new Buffer(data);
      data = data.toString('base64');
      return data.replace(/\+/g, '-').replace(/\//g, '_');
    };

    return EncryptionCipher;

  })();

}).call(this);