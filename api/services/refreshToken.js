class RefreshToken {

    constructor() {
        this.refreshToken = {};
    }

    addToken(token, user) {
        this.refreshToken[token] = user;
    };

    validateToken(token) {
        return this.refreshToken[token] ? this.refreshToken[token] : undefined;
    };

    removeToken(token) {

        if(this.refreshToken[token])
            delete this.refreshToken[token];
    };
}

module.exports.RefreshToken = RefreshToken;

