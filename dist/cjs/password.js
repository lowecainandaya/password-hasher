"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = __importDefault(require("crypto-js"));
const sha256 = crypto_js_1.default.SHA256;
function passwordFromSalt(password, salt) {
    return sha256(password + salt || "").toString();
}
class PasswordHasher {
    /**
     * @description Password hasher instance
     * @param layers is the times a password is going to be hashed
     */
    constructor(layers) {
        this.layers = layers;
        if (typeof layers !== "number") {
            throw new Error('password layers need to be a number');
        }
        if (layers < 1) {
            throw new Error("layers must be atleast 1");
        }
    }
    /**
      * @description method for hashing password
      * @param password is the password to be hashed
      * @param salt an optional secret key
      * @returns {Promise<string>}
     */
    hash(password, salt) {
        return new Promise((r, j) => {
            var __virtual = passwordFromSalt(password, salt);
            const __layer = this.layers;
            try {
                for (var i = 0; i <= __layer; i++) {
                    if (i < __layer) {
                        const __virtualHash = sha256(__virtual);
                        __virtual = __virtualHash.toString();
                    }
                    else {
                        const __virtualFinalHash = sha256(__virtual), __finalHash = __virtualFinalHash.toString();
                        r(__finalHash);
                    }
                }
            }
            catch (e) {
                j(e);
            }
        });
    }
    /**
    * @description a method used to compare if the hash matched the password
    * @param password is the password to be compared
    * @param hash is the hash of the password to be compared into
    * @param salt an optional secret key
    * @return { Promise<boolean> } if the password match
     */
    compare(password, hash, salt) {
        return new Promise((r, j) => {
            this.hash(password, salt).then((a) => {
                r(a === hash);
            })
                .catch((e) => j(e));
        });
    }
}
/**
 * @alias Hasher
 */
exports.default = PasswordHasher;
//# sourceMappingURL=password.js.map