const jwt = require("jsonwebtoken");
const crypto = require("crypto")

const signatureAccess = "signatureAccess";
const signatureRefresh = "signatureRefresh";

const accessTokenAge = 10; //s
const refreshTokenTokenAge = 60 * 60; //s (1h)

const getTokens = (login) => ({
    accessToken: jwt.sign({ login }, signatureAccess, {
        expiresIn: `${accessTokenAge}s`,
    }),
    refreshToken: jwt.sign({ login }, signatureRefresh, {
        expiresIn: `${refreshTokenTokenAge}s`,
    }),
});

const getHashPassword = (password) => {
    const passwordSecret = "12345";
    const algorithm = 'sha256';
    const passwordHash = crypto
        .createHmac(algorithm, passwordSecret)
        .update(password)
        .digest('hex');

    return passwordHash;
};

module.exports = {
    getTokens,
    //refreshTokenTokenAge,
    getHashPassword,
};